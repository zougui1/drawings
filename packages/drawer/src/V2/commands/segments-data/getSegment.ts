import { Segment } from './Segment';
import { getSegmentPoints } from './getSegmentPoints';
import { PartialSegmentData } from '../../types';

export const getSegment = (data: Segment, segment: any[], prevSeg: any[] | undefined, startPosition: { x: number, y: number }): PartialSegmentData => {
  const { start, end } = getSegmentPoints(segment, prevSeg);

  return {
    startPosition,
    start,
    end,
    close: data.closed ? startPosition : null,
    data: segment,
  };
}
