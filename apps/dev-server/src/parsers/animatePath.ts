import { PathJSON, GroupJSON, pathDataToString } from 'drawer';
import * as polymorph from 'polymorph-js';

export const animatedPathToDomString = (path: AnimatedPathJSON): string => {
  const pathData = path.pathData.replace(/\n/g, ' ');

  return `<path
  d="${pathData}"
  stroke="${path.stroke}"
  fill="${path.fill}"
  stroke-width="${path.strokeWidth}"
/>`;
}

export const animatePath = (fromKeyframe: { time: number, path: GroupJSON }, toKeyframe: { time: number, path: GroupJSON }): AnimatedPathJSON[][] => {
  const fps = 60;
  const frameDuration = 1 / fps;
  const frames: AnimatedPathJSON[][] = [];

  for (const fromPath of fromKeyframe.path.paths) {
    const toPath = toKeyframe.path.paths.find(p => p.fullName === fromPath.fullName);

    if (!toPath) {
      throw new Error(`Path "${fromPath.fullName}" not found.`);
    }

    const from = pathDataToString(fromPath.pathData);
    const to = pathDataToString(toPath.pathData);
    const interpolator = polymorph.interpolate([from, to]);

    let frameIndex = 0;

    while ((fromKeyframe.time + (frameIndex * frameDuration)) < toKeyframe.time) {
      const currentPathData = interpolator(frameDuration * frameIndex);

      frames[frameIndex] ??= [];
      frames[frameIndex].push({
        ...fromPath,
        pathData: currentPathData,
      });

      frameIndex++;
    }
  }

  return frames;
}

export interface AnimatedPathJSON extends Omit<PathJSON, 'pathData'> {
  pathData: string;
}
