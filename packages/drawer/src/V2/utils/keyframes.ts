export const parseKeyframesObject = <T>(keyframes: Record<number, T>, options: ParseKeyframesObjectOptions = {}): { time: number, value: T }[] => {
  const dirtyKeyframes = Object.entries(keyframes);

  if (options.min && dirtyKeyframes.length < options.min) {
    throw new Error(`The animation requires at least ${options.min} keyframes. Got ${dirtyKeyframes.length} keyframes.`);
  }

  for (const [keyTime, value] of dirtyKeyframes) {
    checkKeyframeFormat(keyTime, value, options.valueType);
  }

  const _keyframes = dirtyKeyframes
    .map(([time, value]) => ({ time: +time, value }))
    .sort((a, b) => a.time - b.time);

  const firstKeyframe = _keyframes[0];
  const lastKeyframe = _keyframes[_keyframes.length - 1];

  if (firstKeyframe.time !== 0) {
    throw new Error(`The animation must start at 0. Tried starting at "${firstKeyframe.time}".`);
  }

  if (options.end && lastKeyframe.time !== options.end) {
    throw new Error(`The animation must finish at "${options.end}". Tried finishing at "${lastKeyframe.time}".`);
  }

  return _keyframes;
}

const checkKeyframeFormat = (keyTime: string, value: any, valueType?: 'string' | 'function'): void => {
  if (!Number.isFinite(+keyTime)) {
    throw new Error(`The keytime must be a number. Got "${keyTime}".`);
  }

  if (valueType && typeof value !== valueType) {
    throw new Error(`The value of a keyframe must be of type "${valueType}". Got "${value}".`);
  }
}

export interface ParseKeyframesObjectOptions {
  min?: number;
  end?: number;
  valueType?: 'string' | 'function';
}
