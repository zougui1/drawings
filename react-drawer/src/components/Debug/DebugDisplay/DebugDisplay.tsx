import React from 'react';
import { SegmentData, PathObject } from 'drawer';

import { DebugPath } from '../DebugPath';
import { DebugDots } from '../DebugDots';
import { PathKeyframes } from '../../../types';

export const DebugDisplay: React.FC<DebugDisplayProps> = ({ segment, keyframe, debugElements, onDotHover, onDotOut, onDotMouseDown, onDotMouseUp }) => {
  if (!segment && !debugElements.length) {
    return null;
  }

  return (
    <g data-name="debug">
      {segment && <DebugPath segment={segment} />}

      {debugElements.map(element => (
        <DebugDots
          key={Array.isArray(element) ? element[keyframe ?? 0].from.id : element.id}
          persistedSegment={segment}
          path={Array.isArray(element) ? element[keyframe ?? 0].from : element}
          onHover={onDotHover}
          onOut={onDotOut}
          onMouseDown={onDotMouseDown}
          onMouseUp={onDotMouseUp}
        />
      ))}
    </g>
  );
}

export interface DebugDisplayProps {
  segment?: SegmentData;
  keyframe?: number;
  debugElements: PathObject[] | PathKeyframes[];
  onDotHover: (segment: SegmentData) => void;
  onDotOut: (segment: SegmentData) => void;
  onDotMouseDown: (segment: SegmentData) => void;
  onDotMouseUp: (segment: SegmentData) => void;
}
