import React from 'react';
import { SegmentData, PathJSON } from 'drawer';

import { DebugPath } from '../DebugPath';
import { DebugDots } from '../DebugDots';
import { HighlightPaths } from '../HighlightPaths';

export const DebugDisplay: React.FC<DebugDisplayProps> = ({ segment, debugElements, onDotHover, onDotOut, onDotMouseDown, onDotMouseUp }) => {
  if (!segment && !debugElements.length) {
    //return null;
  }

  return (
    <g data-name="debug">
      {segment && <DebugPath segment={segment} />}

      <HighlightPaths />

      {debugElements.map(element => (
        <DebugDots
          key={element.fullName}
          currentSegment={segment}
          path={element}
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
  debugElements: PathJSON[];
  onDotHover: (segment: SegmentData) => void;
  onDotOut: (segment: SegmentData) => void;
  onDotMouseDown: (segment: SegmentData) => void;
  onDotMouseUp: (segment: SegmentData) => void;
}
