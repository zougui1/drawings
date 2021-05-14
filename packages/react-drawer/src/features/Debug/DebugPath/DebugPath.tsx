import React from 'react';
import { SegmentData } from 'drawer';

export const DebugPath: React.FC<DebugPathProps> = ({ segment }) => {
  return (
    <>
      <path
        stroke="#ff0"
        fill="none"
        data-name="debug-path-highlight"
        // thicker than the original path so that it completely overlaps it
        //strokeWidth={segment.path.strokeWidth + 0.5}
        strokeWidth={1 + 0.5}
        d={segment.path.path}
      />
      <path
        stroke="#f00"
        fill="none"
        data-name="debug-segment-highlight"
        // thicker than path highlight so that it completely overlaps it
        strokeWidth={segment.path.strokeWidth + 0.6}
        d={segment.segment.path}
      />
    </>
  );
}

export interface DebugPathProps {
  segment: SegmentData;
}
