import React, { memo } from 'react';
import { getSegmentsData, PathObject, SegmentData } from 'drawer';

const DebugDotsNaked: React.FC<DebugDotsProps> = ({ path, persistedSegment, onHover, onOut, onMouseDown, onMouseUp }) => {
  const segments = getSegmentsData(path);

  return (
    <>
      {segments.map(segment => (
        <path
          key={segment.id}
          stroke={persistedSegment?.id === segment.id ? '#05f' : '#a00'}
          fill="#fff"
          strokeWidth={segment.marker.strokeWidth}
          d={segment.marker.path}
          onMouseEnter={() => onHover(segment)}
          onMouseOut={() => onOut(segment)}
          onMouseDown={() => onMouseDown(segment)}
          onMouseUp={() => onMouseUp(segment)}
        />
      ))}
    </>
  );
}

export interface DebugDotsProps {
  path: PathObject;
  persistedSegment?: SegmentData;
  onHover: (segment: SegmentData) => void;
  onOut: (segment: SegmentData) => void;
  onMouseDown: (segment: SegmentData) => void;
  onMouseUp: (segment: SegmentData) => void;
}

export const DebugDots = memo(DebugDotsNaked, (prevProps, nextProps) => {
  return prevProps.path !== nextProps.path;
});
