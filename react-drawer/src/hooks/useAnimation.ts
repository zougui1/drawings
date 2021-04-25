import { useRef, useEffect } from 'react';
import { EventEmitter } from 'events';
import _ from 'lodash';

import { fullAnimation, AnimationOptions } from '../animation';

interface Keyframe {
  duration: number;
  from: string;
  to: string;
}

interface UseAnimationOptions {
  isPlaying: boolean;
  onComplete?: () => void;
  onKeyframeChange?: (keyframe: number) => void;
}

const defaultOptions: UseAnimationOptions = {
  isPlaying: false,
};

export interface UseAnimationResult {
  pause: () => void;
  play: () => void;
  resume: () => void;
  isPlaying: () => boolean;
}

export const useAnimation = (path: React.MutableRefObject<SVGPathElement | undefined>, keyframes: Keyframe[], options: Partial<UseAnimationOptions> = {}): UseAnimationResult => {
  const _options = _.merge({}, options, defaultOptions);

  const isPlaying = useRef(_options.isPlaying);
  const isStillPlaying = useRef(false);
  const keyframeIndex = useRef(0);
  const progress = useRef(0);
  const emitter = useRef(new EventEmitter());

  const onStart = () => {
    isStillPlaying.current = true;
  }
  const onComplete = () => {
    isStillPlaying.current = false;
    _options.onComplete?.();
  }

  const animate = () => {
    const options: AnimationOptions = {
      onStart,
      onComplete,
      startAtKeyframe: keyframeIndex.current,
      startAtProgress: progress.current,
      emitter: emitter.current,
    };

    if (!path.current) {
      return;
    }

    fullAnimation(path.current, keyframes, options);
  }

  const start = () => {
    emitter.current.emit('interrupt');
    isPlaying.current = true;
    animate();
  }

  const pause = () => {
    emitter.current.emit('stop');
    isPlaying.current = false;
  }
  const play = () => {
    keyframeIndex.current = 0;
    progress.current = 0;
    start();
  }
  const resume = () => {
    start();
  }

  useEffect(() => {
    emitter.current.on('progress', newProgress => {
      progress.current = newProgress;
    });

    emitter.current.on('animate', keyframe => {
      keyframeIndex.current = keyframe;
      _options.onKeyframeChange?.(keyframe);
    });

    if (isPlaying.current) {
      animate();
    }
  }, []);

  return {
    pause,
    play,
    resume,
    isPlaying: () => isPlaying.current,
  };
}
