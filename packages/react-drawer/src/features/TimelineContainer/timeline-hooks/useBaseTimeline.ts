import { useRef, useState, Ref, MutableRefObject, Dispatch, SetStateAction } from 'react';

export const useBaseTimeline = (options: UseBaseTimelineOptions): UseBaseTimelineResult => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const sliderRef = useRef<HTMLElement | null>(null);
  const lastFrameTime = options.duration - 0.001;

  const currentTime = svgRef.current?.getCurrentTime() ?? 0;
  const isPaused = svgRef.current?.animationsPaused() === true;

  const getSvg = (): SVGSVGElement | null => {
    return svgRef.current ??= options.getSvg();
  }

  const updateKeyframeIndex = (newKeyframeIndex: number) => {
    const svg = getSvg();

    if(!svg) {
      return;
    }

    const newKeyframe = options.keyframes[newKeyframeIndex];

    if (newKeyframe) {
      if (newKeyframeIndex === options.keyframes.length - 1) {
        svg.setCurrentTime(lastFrameTime);
      } else {
        svg.setCurrentTime(newKeyframe.time);
      }

      setKeyframeIndex(newKeyframeIndex);
      updateSliderProgression(newKeyframe.time);
    }
  }

  const updateCurrentTime = (time: number): boolean => {
    const svg = getSvg();

    if (!svg) {
      return false;
    }

    svg.setCurrentTime(time);
    const progression = time / options.duration;
    const passedTimes = options.keyframes.filter(kf => kf.time <= time);
    const animationFinished = progression >= 1;


    if (animationFinished) {
      setKeyframeIndex(options.keyframes.length - 1);
    } else {
      setKeyframeIndex(Math.max(0, passedTimes.length - 1));
    }

    return animationFinished;
  }

  const updateSliderProgression = (time: number) => {
    if (sliderRef.current) {
      const sliderTrack = options.getSliderTrack(sliderRef.current);
      const sliderThumb = options.getSliderThumb(sliderRef.current);

      if (sliderTrack && sliderThumb) {
        const percent = Math.min(100, time * 100 / options.duration);
        const percentage = `${percent}%`;

        sliderTrack.style.width = percentage;
        sliderThumb.style.left = percentage;
      }
    }
  }

  const updateTime = (time: number): boolean => {
    const didAnimationFinish = updateCurrentTime(time);
    updateSliderProgression(time);
    return didAnimationFinish;
  }

  return {
    updateKeyframeIndex,
    updateTime,
    svgRef,
    getSvg,
    lastFrameTime,
    keyframeIndex,
    setKeyframeIndex,
    sliderRef,
    currentTime,
    isPaused,
  };
}

export interface UseBaseTimelineOptions {
  /**
   * duration of the animation in seconds
   */
  duration: number;
  keyframes: { time: number }[];
  getSvg: () => SVGSVGElement | null;
  getSliderTrack: (slider: HTMLElement) => HTMLElement | null;
  getSliderThumb: (slider: HTMLElement) => HTMLElement | null;
}

export interface UseBaseTimelineResult {
  updateKeyframeIndex: (newKeyTimeIndex: number) => void;
  updateTime: (newTime: number) => boolean;
  svgRef: MutableRefObject<SVGSVGElement | null>;
  getSvg: () => SVGSVGElement | null;
  lastFrameTime: number;
  keyframeIndex: number;
  setKeyframeIndex: Dispatch<SetStateAction<number>>;
  sliderRef: Ref<HTMLElement | null>;
  currentTime: number;
  isPaused: boolean;
}
