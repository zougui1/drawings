import { useState, Ref } from 'react';

import { useBaseTimeline } from './useBaseTimeline';
import { useAnimationFrame, useEvent } from '../../../hooks';

export const useTimeline = (options: UseTimelineOptions): UseTimelineResult => {
  const [isPlaying, setIsPlaying] = useState(false);
  const baseTimeline = useBaseTimeline(options);

  useAnimationFrame(animation => {
    const svg = baseTimeline.getSvg();

    if (!svg || !isPlaying) {
      return;
    }

    const currentTime = svg.getCurrentTime();
    const animationFinished = baseTimeline.updateTime(currentTime);

    if (animationFinished) {
      stopAtTheEnd(svg);
    } else {;
      animation.nextFrame();
    }
  }, [isPlaying]);

  useEvent('keypress', e => {
    if (options.togglePlayWithKey && e.key === options.togglePlayWithKey) {
      togglePlay();
    }
  }, [isPlaying]);

  const hasPreviousKeyframe = baseTimeline.keyframeIndex > 0;
  const hasNextKeyframe = (baseTimeline.keyframeIndex + 1) < options.keyframes.length;

  const didAnimationBegin = baseTimeline.currentTime > 0 && !baseTimeline.isPaused;
  const didAnimationFinish = baseTimeline.currentTime >= (options.duration - 0.0011) && baseTimeline.isPaused;

  const goToPreviousKeyframe = () => {
    if (hasPreviousKeyframe) {
      baseTimeline.updateKeyframeIndex(baseTimeline.keyframeIndex - 1);
    }
  }

  const goToNextKeyframe = () => {
    if (hasNextKeyframe) {
      baseTimeline.updateKeyframeIndex(baseTimeline.keyframeIndex + 1);
    }
  }

  const play = () => {
    const svg = baseTimeline.getSvg();

    if (svg) {
      svg.unpauseAnimations();
      setIsPlaying(true);
    }
  }

  const pause = () => {
    const svg = baseTimeline.getSvg();

    if (svg) {
      svg.pauseAnimations();
      setIsPlaying(false);
    }
  }

  const replay = () => {
    const svg = baseTimeline.getSvg();

    if (svg) {
      baseTimeline.updateTime(0);
      svg.unpauseAnimations();
      setIsPlaying(true);
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  const stopAtTheEnd = (svg: SVGSVGElement) => {
    svg.pauseAnimations();
    svg.setCurrentTime(baseTimeline.lastFrameTime);
    setIsPlaying(false);
  }

  return {
    goToKeyframeIndex: baseTimeline.updateKeyframeIndex,
    goToTime: baseTimeline.updateTime,
    isPlaying: isPlaying,
    keyframeIndex: baseTimeline.keyframeIndex,
    sliderRef: baseTimeline.sliderRef,
    currentTime: baseTimeline.currentTime,
    hasPreviousKeyframe,
    hasNextKeyframe,
    didAnimationBegin,
    didAnimationFinish,

    play,
    pause,
    replay,
    goToPreviousKeyframe,
    goToNextKeyframe,
  };
}

export interface UseTimelineOptions {
  /**
   * duration of the animation in seconds
   */
  duration: number;
  keyframes: { time: number }[];
  getSvg: () => SVGSVGElement | null;
  getSliderTrack: (slider: HTMLElement) => HTMLElement | null;
  getSliderThumb: (slider: HTMLElement) => HTMLElement | null;
  togglePlayWithKey?: string;
}

export interface UseTimelineResult {
  goToKeyframeIndex: (newKeyTimeIndex: number) => void;
  goToTime: (newTime: number) => boolean;
  isPlaying: boolean;
  keyframeIndex: number;
  sliderRef: Ref<HTMLElement | null>;
  hasPreviousKeyframe: boolean;
  hasNextKeyframe: boolean;
  didAnimationBegin: boolean;
  didAnimationFinish: boolean;
  currentTime: number;

  play: () => void;
  pause: () => void;
  replay: () => void;
  goToPreviousKeyframe: () => void;
  goToNextKeyframe: () => void;
}
