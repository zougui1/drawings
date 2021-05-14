import * as d3 from 'd3';
import * as polymorph from 'polymorph-js';
import { EventEmitter } from 'events';

interface Keyframe {
  duration: number;
  from: string;
  to: string;
}

interface PartialAnimationOptions {
  onStart?: () => void;
  onComplete: () => void;
  startAtProgress: number;
  emitter: EventEmitter,
}

export const partialAnimation = (path: SVGPathElement, keyframe: Keyframe, options: PartialAnimationOptions) => {
  const { onStart, onComplete, startAtProgress, emitter } = options;

  let interrupted = false;
  let playing = true;

  emitter.once('interrupt', () => {
    interrupted = true;
  });

  // using 'on' can cause a memory leak, since this
  // this function can get called many time with the
  // SAME EventEmitter
  emitter.once('stop', () => {
    playing = false;
  });

  d3
    .select(path)
    .transition()
    .duration(keyframe.duration)
    .attrTween('d', (d) => {
      // optimization for identical keyframes
      if (keyframe.from === keyframe.to) {
        return () => keyframe.to;
      }

      const interpolator = polymorph.interpolate([keyframe.from, keyframe.to]);
      let lastInterpolation: string | undefined;

      return (newProgress) => {
        if (playing && !interrupted && startAtProgress < newProgress) {
          //console.log(newProgress);
          emitter.emit('progress', newProgress);
          return lastInterpolation = interpolator(newProgress);
        }

        if (!lastInterpolation) {
          lastInterpolation = interpolator(startAtProgress);
        }

        return lastInterpolation;
      }
    })
    .on('start', () => {
      onStart?.()
    })
    .on('end', () => {
      if (playing && !interrupted) {
        emitter.emit('progress', 0);
      }

      onComplete();
    });
}

export interface AnimationOptions {
  onStart?: () => void;
  onComplete?: () => void;
  startAtKeyframe: number;
  startAtProgress: number;
  emitter: EventEmitter,
}

export const fullAnimation = (path: SVGPathElement, keyframes: Keyframe[], options: AnimationOptions): void => {
  const {
    onStart,
    startAtProgress,
    startAtKeyframe,
    emitter,
  } = options;

  let playing = true;
  let currentKeyframeIndex = startAtKeyframe;

  // using 'on' can cause a memory leak, since this
  // this function can get called many time with the
  // SAME EventEmitter
  emitter.once('stop', () => {
    playing = false;
  });

  const onComplete = () => {
    currentKeyframeIndex++;

    if (currentKeyframeIndex >= keyframes.length || !playing) {
      options.onComplete?.();
      return;
    }

    if (!keyframes[currentKeyframeIndex]) {
      console.log('keyframe does not exist');
      return;
    }

    emitter.emit('animate', currentKeyframeIndex);
    partialAnimation(path, keyframes[currentKeyframeIndex], {
      onComplete: onComplete,
      startAtProgress,
      emitter,
    });
  }

  if (!keyframes[currentKeyframeIndex]) {
    console.log('keyframe does not exist');
    return;
  }

  emitter.emit('animate', currentKeyframeIndex);
  partialAnimation(path, keyframes[currentKeyframeIndex], {
    onStart,
    onComplete: onComplete,
    startAtProgress,
    emitter,
  });
}
