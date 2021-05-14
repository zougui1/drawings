import React, { memo, useMemo } from 'react';
import { getSegmentsData, PathJSON, SegmentData } from 'drawer';

const DebugDotsNaked: React.FC<DebugDotsProps> = ({ path, currentSegment, onHover, onOut, onMouseDown, onMouseUp }) => {
  const segments = getSegmentsData(path);

  return (
    <>
      {segments.map((segment, i) => (
        <path
          key={segment.id}
          stroke={currentSegment?.id === segment.id ? '#05f' : '#a00'}
          fill="#fff"
          strokeWidth={segment.marker.strokeWidth}
          d={segment.marker.path}
          onMouseEnter={() => onHover(segment)}
          onMouseOut={() => onOut(segment)}
          onMouseDown={() => onMouseDown(segment)}
          onMouseUp={() => onMouseUp(segment)}
        ></path>
      ))}
    </>
  );
}

export interface DebugDotsProps {
  path: PathJSON;
  currentSegment?: SegmentData;
  onHover: (segment: SegmentData) => void;
  onOut: (segment: SegmentData) => void;
  onMouseDown: (segment: SegmentData) => void;
  onMouseUp: (segment: SegmentData) => void;
}

export const DebugDots = memo(DebugDotsNaked, (prevProps, nextProps) => {
  return prevProps.path !== nextProps.path;
});
