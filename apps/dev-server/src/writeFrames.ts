import path from 'path';
import sharp from 'sharp';
import { AnimatorJSON, GroupJSON, PathJSON, pathDataToString } from 'drawer';
import _ from 'lodash';
import fs from 'fs-extra';
import pngFileStream from 'png-file-stream';
import GifEncoder from 'gifencoder';

import { drawerToDomString, animatorToDomString } from './parsers';
import { SvgGif, decode } from './SvgGif';

export const writeFrames = async (data: AnimatorJSON) => {
  data = _.cloneDeep(data);
  let number = 0;
  const fps = 60;
  const frameDuration = 100 / fps;
  const digitNumber = (data.duration * fps).toString().length;

  const frames = animatorToDomString(data);
  const animationDir = path.join(process.cwd(), 'animations', data.name);
  const svgDir = path.join(animationDir, 'SVG');
  const pngDir = path.join(animationDir, 'PNG');

  await fs.rm(svgDir, { recursive: true });
  await fs.rm(pngDir, { recursive: true });

  for (const frame of frames) {
    const zeroesCount = digitNumber - number.toString().length;
    const prefix = '0'.repeat(zeroesCount);
    const cleanNumber = `${prefix}${number}`;
    await writeFrame(frame, data, cleanNumber);

    number++;
  }

  const fileNames = await fs.readdir(pngDir);

  /*const gif = new SvgGif({
    width: data.width,
    height: data.height,
    fileName: path.join(animationDir, `${data.name}.gif`),
  });*/
  const scale = 0.3;
  const encoder = new GifEncoder(data.width * scale, data.height * scale);

  console.time('GIF encoding');
  const stream = pngFileStream(`${pngDir}/*.png`)
    .pipe(encoder.createWriteStream({ repeat: 0, delay: frameDuration, quality: 10 }))
    .pipe(fs.createWriteStream(path.join(animationDir, `${data.name}.gif`)));

  stream.on('finish', () => {
    console.log('GIF encoded!');
    console.timeEnd('GIF encoding');
  });

  let i = 0;
  let decodedCount = 0;

  /*const imageBuffers = await Promise.all(
    fileNames.sort((a, b) => (+a.replace('.png', '')) - (+b.replace('.png', ''))).map(async fileName => {
      const file = path.join(pngDir, fileName);
      const imageBuffer = await fs.readFile(file);
      const decodedImage = await decode(imageBuffer);
      console.log(`${++decodedCount} images decoded.`);
      return decodedImage.data;
    })
  );

  console.time('GIF encoding');
  for (const imageBuffer of imageBuffers) {
    await gif.addDecodedFrame(imageBuffer, frameDuration);
    console.log(`Frame ${++i} added to GIF.`);
  }
  console.timeEnd('GIF encoding');

  gif.finish();
  console.log('GIF encoded!');*/
}

export const writeFrame = async (frame: string, data: AnimatorJSON, number: number | string) => {
  const animationDir = path.join(process.cwd(), 'animations', data.name);
  const svgDir = path.join(animationDir, 'SVG');
  const pngDir = path.join(animationDir, 'PNG');
  const svgFileName = path.join(svgDir, `${number}.svg`);
  const pngFileName = path.join(pngDir, `${number}.png`);

  await fs.ensureDir(svgDir);
  await fs.ensureDir(pngDir);
  await fs.writeFile(svgFileName, frame);
  await sharp(svgFileName).png().toFile(pngFileName);
}
