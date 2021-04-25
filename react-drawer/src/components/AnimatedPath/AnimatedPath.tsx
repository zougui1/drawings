import React, { useState, useRef, useEffect } from 'react';
import { Path as PathBuilder } from 'drawer';
import _ from 'lodash';

import { useAnimation } from '../../hooks';
import { PathKeyframes } from '../../types';

export const AnimatedPath: React.FC<AnimatedPathProps> = ({ playing, path, onComplete, keyframe, onKeyframeChange }) => {
  const pathRef = useRef<SVGPathElement | undefined>();

  const keyframes = path.map(frame => {
    const from = PathBuilder.fromObject(frame.from);
    const to = PathBuilder.fromObject(frame.to);

    return {
      duration: frame.duration,
      from: from.pathData.toString(),
      fromObject: from,
      to: to.pathData.toString(),
      toObject: to,
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
      data-z-index={keyframes[0].fromObject.getZIndex() || undefined}
      data-name={keyframes[0].fromObject.getName() || undefined}
      stroke={keyframes[0].fromObject.getStroke()}
      strokeWidth={keyframes[0].fromObject.getStrokeWidth()}
      fill={keyframes[0].fromObject.getFill()}
      transform={keyframes[0].fromObject.getTransform() || undefined}
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
