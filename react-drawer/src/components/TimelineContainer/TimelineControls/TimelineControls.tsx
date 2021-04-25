import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { useStyles } from './TimelineControls.styles';
import { Control } from './Control';

export const TimelineControls: React.FC<TimelineControlsProps> = ({ onPlay, onPause, onPrevious, onNext, isPlaying }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Control
        tooltip="Go to previous keyframe"
        onClick={onPrevious}
      >
        <SkipPreviousIcon />
      </Control>

      {isPlaying ? (
        <Control
          tooltip="Pause"
          onClick={onPause}
        >
          <PauseIcon />
        </Control>
      ): (
        <Control
          tooltip="Play"
          onClick={onPlay}
        >
          <PlayArrowIcon />
        </Control>
      )}

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
  onPause?: () => void;
  onNext?: () => void;
  isPlaying: boolean;
}
