import React from 'react';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { useStyles } from './TimelineControls.styles';
import { Control } from './Control';
import { PlayingControl } from './PlayingControl';

export const TimelineControls: React.FC<TimelineControlsProps> = ({ onPlay, onReplay, onPause, onPrevious, onNext, isPlaying, didAnimationFinish }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Control
        tooltip="Go to previous keyframe"
        onClick={onPrevious}
      >
        <SkipPreviousIcon />
      </Control>

      <PlayingControl
        onPlay={onPlay}
        onReplay={onReplay}
        onPause={onPause}
        isPlaying={isPlaying}
        didAnimationFinish={didAnimationFinish}
      />

      <Control
        tooltip="Go to next keyframe"
        onClick={onNext}
      >
        <SkipNextIcon />
      </Control>
    </div>
  );
}

export interface TimelineControlsProps {
  onPrevious?: () => void;
  onPlay?: () => void;
  onReplay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  didAnimationFinish?: boolean;
  isPlaying: boolean;
}
