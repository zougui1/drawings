import { PathJSON } from 'drawer';

import { KeyframePath, PathKeyframes } from '../types';

const buildFrame = (path1: PathJSON, path2: PathJSON, duration: number): KeyframePath => {
  return {
    duration,
    from: path1,
    to: path2,
  };
}

const buildFrames = (frames: PathJSON[], durations: number[]): PathKeyframes => {
  const lastFrame = frames[frames.length - 1];

  return frames.slice(1).concat([lastFrame]).map((frame, i) => {
    const from = frames[i];
    const duration = durations[i];

    return buildFrame(from, frame, duration);
  });
}

export const buildKeyframes = (keyframes: { duration: number, paths: PathJSON[] }[]): PathKeyframes[] => {
  const frames = keyframes.map(kf => kf.paths);
  const durations = keyframes.map(kf => kf.duration);
  const paths: PathJSON[][] = [];

  frames.forEach((frame) => {
    frame.forEach((path, i) => {
      paths[i] ??= [];
      paths[i].push(path);
    });
  });

  return paths.map((frames) => {
    return buildFrames(frames, durations);
  })
}
