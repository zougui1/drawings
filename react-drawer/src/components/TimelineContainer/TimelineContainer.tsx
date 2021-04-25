import React, { memo, useState } from 'react';
import {
  DrawerObject,
  Drawer,
  PathObject,
  SegmentData,
  PathData,
  Animation,
  AnimationJSON,
  GroupObject,
  Path as PathBuilder,
  Group as GroupBuilder,
} from 'drawer';

import { TimelineControls } from './TimelineControls';
import { Timeline } from './Timeline';

const TimelineContainerNaked: React.FC<TimelineContainerProps> = ({ data, keyframe, onKeyframeChange, playing, onPlayingChange }) => {
  if (data.type !== Animation.type) {
    return null;
  }

  const hasPreviousKeyframe = keyframe > 0;
  const hasNextKeyframe = (keyframe + 1) < data.keyframes.length;

  const handlePrevious = () => {
    if (hasPreviousKeyframe) {
      onKeyframeChange(keyframe - 1);
    }
  }

  const handleNext = () => {
    if (hasNextKeyframe) {
      onKeyframeChange(keyframe + 1);
    }
  }

  const handlePlay = () => {
    onPlayingChange(true);
  }

  const handlePause = () => {
    onPlayingChange(false);
  }

  const handleTimelineClick = (keyframe: number) => {
    onKeyframeChange(keyframe);
  }

  return (
    <div
      className="timeline-container"
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#333',
        boxShadow: '0 0 5px 2px #0006',
        paddingLeft: 12,
        paddingRight: 12,
        boxSizing: 'border-box',
      }}
    >
      <TimelineControls
        onPrevious={hasPreviousKeyframe ? handlePrevious : undefined}
        onNext={hasNextKeyframe ? handleNext : undefined}
        onPlay={handlePlay}
        onPause={handlePause}
        isPlaying={playing}
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '95%' }}>
          <Timeline
            keyframes={data.keyframes}
            duration={data.duration}
            currentKeyframe={keyframe}
            onClick={handleTimelineClick}
          />
        </div>
      </div>
    </div>
  );
}

export interface TimelineContainerProps {
  data: (DrawerObject | AnimationJSON);
  keyframe: number;
  onKeyframeChange: (keyframe: number) => void;
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
}

export const TimelineContainer = memo(TimelineContainerNaked);
