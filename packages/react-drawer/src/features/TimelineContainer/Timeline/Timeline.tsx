import React, { memo } from 'react';
import clsx from 'clsx';
import { AnimatorJSON } from 'drawer';

import { useStyles } from './Timeline.styles';
import { TimelineControls } from '../TimelineControls';
import { TimelineSlider } from '../TimelineSlider';
import { useTimeline } from '../timeline-hooks';
import { useEvent } from '../../../hooks';

const TimelineNaked: React.FC<TimelineContainerProps> = ({ data }) => {
  const classes = useStyles();
  const timeline = useTimeline({
    duration: data.duration,
    keyframes: data.keyframes,
    getSvg: () => document.getElementById(data.slug) as SVGSVGElement | null,
    getSliderTrack: slider => slider.querySelector('.MuiSlider-track') as HTMLElement,
    getSliderThumb: slider => slider.querySelector('.MuiSlider-thumb') as HTMLElement,
    togglePlayWithKey: ' ',
  });

  return (
    <div className={clsx('timeline-container', classes.root)}>
      <TimelineControls
        onPrevious={timeline.hasPreviousKeyframe ? timeline.goToPreviousKeyframe : undefined}
        onNext={timeline.hasNextKeyframe ? timeline.goToNextKeyframe : undefined}
        onPlay={timeline.play}
        onReplay={timeline.replay}
        onPause={timeline.pause}
        didAnimationFinish={timeline.didAnimationFinish}
        isPlaying={timeline.isPlaying}
      />

      <div className={classes.sliderContainer}>
        <div className={classes.slider}>
          <TimelineSlider
            sliderRef={timeline.sliderRef}
            keyframes={data.keyframes}
            duration={data.duration}
            currentKeyframe={timeline.keyframeIndex}
            onClick={timeline.goToKeyframeIndex}
            currentTime={timeline.currentTime}
            onTimeChange={timeline.goToTime}
          />
        </div>
      </div>
    </div>
  );
}

export interface TimelineContainerProps {
  data: AnimatorJSON;
}

export const Timeline = memo(TimelineNaked);
