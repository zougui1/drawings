import React, { useState, useRef, useEffect } from 'react';
import { pathDataToString } from 'drawer';
import _ from 'lodash';

import { useAnimation } from '../../hooks';
import { PathKeyframes } from '../../types';

export const AnimatedPath: React.FC<AnimatedPathProps> = ({ playing, path, onComplete, keyframe, onKeyframeChange }) => {
  const pathRef = useRef<SVGPathElement | undefined>();

  const keyframes = path.map(frame => {
    return {
      duration: frame.duration,
      from: pathDataToString(frame.from.pathData),
      fromOrigin: frame.from,
      to: pathDataToString(frame.to.pathData),
    };
  });

  const [currentKeyframe, setCurrentKeyframe] = useState(keyframes[keyframe ?? 0]);

  const animation = useAnimation(pathRef, keyframes, {
    onComplete,
    onKeyframeChange,
  });

  useEffect(() => {
    if (playing) {
      animation.play();
    } else {
      animation.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!animation.isPlaying() && keyframe !== undefined) {
      setCurrentKeyframe(keyframes[keyframe]);
    }
  }, [keyframe, path]);

  return (
    <path
      // @ts-ignore
      ref={pathRef}
      // or undefined to avoid setting the properties to empty values
      data-z-index={keyframes[0].fromOrigin.zIndex || undefined}
      data-name={keyframes[0].fromOrigin.name || undefined}
      stroke={keyframes[0].fromOrigin.stroke}
      strokeWidth={keyframes[0].fromOrigin.strokeWidth}
      fill={keyframes[0].fromOrigin.fill}
      d={currentKeyframe.from}
    >
    </path>
  );
}

export interface AnimatedPathProps {
  path: PathKeyframes;
  playing?: boolean;
  onComplete?: () => void;
  keyframe?: number;
  onKeyframeChange?: (keyframe: number) => void;
}
