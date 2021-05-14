import fs from 'fs-extra';
import GifEncoder from 'gif-encoder';
import { PNG } from 'pngjs';

export const decode = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    new PNG({ filterType: 4 }).parse(data, (err, png) => {
      if (err) {
        return reject(err);
      }

      resolve(png);
    });
  });
}

export class SvgGif {

  gif: GifEncoder;

  constructor({ width, height, fileName, repeat }: SvgGifOptions) {
    this.gif = new GifEncoder(width, height, {
      highWaterMark: 5 * 1024 * 1024 // 5MB
    });
    this.gif.setRepeat(repeat ?? 0);
    this.gif.on('error', (err) => console.log(err));

    const file = fs.createWriteStream(fileName);
    this.gif.pipe(file);
    this.gif.setFrameRate(120 * 5);
    this.gif.writeHeader();
  }

  async addDecodedFrame(buffer: Buffer, delay: number): Promise<void> {
    this.gif.addFrame(buffer);
  }

  finish(): void {
    this.gif.finish();
  }
}

export interface SvgGifOptions {
  width: number;
  height: number;
  fileName: string;
  repeat?: number;
}
