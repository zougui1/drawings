export const keyframeTimesToString = (keyframes: { time?: number }[]): string | undefined => {
  const times = keyframes
    .map(kf => kf.time)
    .filter(kf => kf !== undefined && kf !== null) as number[];

  if (!times.length) {
    return undefined;
  }

  if (times.length !== keyframes.length) {
    throw new Error(`The keyframes must either all have a time or not at all. Got ${times.length} times for ${keyframes.length} keyframes.`);
  }

  return times.join(';\n');
}
