import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
import PauseIcon from '@material-ui/icons/Pause';

import { Control } from '../Control';

export const PlayingControl: React.FC<PlayingControlProps> = ({ onPlay, onReplay, onPause, isPlaying, didAnimationFinish }) => {
  if (isPlaying) {
    return (
      <Control
        tooltip="Pause"
        onClick={onPause}
      >
        <PauseIcon />
      </Control>
    );
  }

  if (didAnimationFinish) {
    return (
      <Control
        tooltip="Replay"
        onClick={onReplay}
      >
        <ReplayIcon />
      </Control>
    );
  }

  return (
    <Control
      tooltip="Play"
      onClick={onPlay}
    >
      <PlayArrowIcon />
    </Control>
  );
}

export interface PlayingControlProps {
  onPlay?: () => void;
  onReplay?: () => void;
  onPause?: () => void;
  didAnimationFinish?: boolean;
  isPlaying: boolean;
}
