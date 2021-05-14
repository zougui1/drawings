import React, { Ref } from 'react';
import { AnimatorJSON } from 'drawer';
import { Slider } from '@material-ui/core';

import { useStyles } from './TimelineSlider.styles';
import { KeyPoint } from './KeyPoint';

export const TimelineSlider: React.FC<TimelineSliderProps> = ({ sliderRef, currentTime, onTimeChange, currentKeyframe, keyframes, duration, onClick }) => {
  const classes = useStyles();

  const handleChange = (e: any, value: number | number[]) => {
    onTimeChange(Array.isArray(value) ? value[0] : value);
  }

  return (
    <div className={classes.root}>
      <Slider
        innerRef={sliderRef}
        step={0.00001}
        min={0}
        max={duration - 0.001}
        value={currentTime}
        onChange={handleChange}
        classes={{
          rail: classes.sliderRail,
          track: classes.sliderRail,
          thumb: classes.sliderThumb
        }}
      />
      <div className={classes.timelineItems}>
        {keyframes.map((kf, i) => (
          <KeyPoint
            key={kf.time}
            left={(kf.time / duration) * 100}
            tooltip="title"
            active={currentKeyframe === i}
            onClick={() => onClick?.(i)}
          />
        ))}
      </div>
    </div>
  );
}

export interface TimelineSliderProps {
  keyframes: AnimatorJSON['keyframes'];
  duration: number;
  currentTime: number;
  onTimeChange: (time: number) => void;
  currentKeyframe: number;
  onClick?: (keyframe: number) => void;
  sliderRef?: Ref<HTMLElement | null>;
}
