import React from 'react';
import { TimelineContainer } from 'react-drawer';

import { changePlaying, changeKeyframe } from './timelineSlice';
import { useAppSelector, useAppDispatch } from '../../store';

export const Timeline: React.FC = () => {
  const dispatch = useAppDispatch();

  const drawerData = useAppSelector(state => state.drawer.data);
  const isPlaying = useAppSelector(state => state.timeline.isPlaying);
  const keyframe = useAppSelector(state => state.timeline.keyframe);

  const handlePlayingChange = (isPlaying: boolean) => {
    dispatch(changePlaying(isPlaying));
  }

  const handleKeyframeChange = (keyframe: number) => {
    dispatch(changeKeyframe(keyframe));
  }

  return (
    <>
      {drawerData && <TimelineContainer
        data={drawerData}
        playing={isPlaying}
        keyframe={keyframe}
        onPlayingChange={handlePlayingChange}
        onKeyframeChange={handleKeyframeChange}
      />}
    </>
  )
}
