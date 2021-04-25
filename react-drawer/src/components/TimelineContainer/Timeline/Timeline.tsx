import React from 'react';
import { AnimationJSON } from 'drawer';

import { useStyles } from './Timeline.styles';
import { KeyPoint } from './KeyPoint';

export const Timeline: React.FC<TimelineProps> = ({ currentKeyframe, keyframes, duration, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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

export interface TimelineProps {
  keyframes: AnimationJSON['keyframes'];
  duration: number;
  currentKeyframe: number;
  onClick?: (keyframe: number) => void;
}
