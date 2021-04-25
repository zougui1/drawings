import React, { memo } from 'react';
import { Group as GroupBuilder, Path as PathBuilder, DrawingElementObject, GroupObject, PathObject } from 'drawer';

import { Group } from '../Group';
import { Path } from '../Path';
import { AnimatedPath } from '../AnimatedPath';
import { PathKeyframes } from '../../types';

const RenderElementNaked: React.FC<RenderElementProps> = ({ element, ...animationProps }) => {
  if (Array.isArray(element)) {
    return <AnimatedPath {...animationProps} path={element} />;
  }

  switch (element.type) {
    case GroupBuilder.type:
      return <Group group={element as GroupObject} />;
    case PathBuilder.type:
      return <Path path={element as PathObject} />;
  }

  throw new Error(`Invalid element '${element.type}'`);
}

export interface RenderElementProps {
  element: DrawingElementObject | PathKeyframes;
  playing?: boolean;
  onComplete?: () => void;
  keyframe?: number;
  onKeyframeChange?: (keyframe: number) => void;
}

export const RenderElement = memo(RenderElementNaked)
