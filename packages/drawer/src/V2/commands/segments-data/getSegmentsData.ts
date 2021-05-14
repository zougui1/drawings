import { getSegments } from './getSegments';
import { getMarkerData } from './getMarkerData';
import { getSegmentPath } from './getSegmentPath';
import { getSegment } from './getSegment';
import { getSegmentPoints } from './getSegmentPoints';
import { getPathData } from './getPathData';
import { fixArcsRotation } from './fixArcsRotation';
import { Segment } from './Segment';
import { Move } from '../Move';
import { pathDataToString } from '../parsers';
import { PathJSON } from '../../drawing-elements';
import { SegmentData } from '../../types';

export const getSegmentsData = (path: PathJSON): SegmentData[] => {
  // for some reason the rotation of the arcs in the path
  // messes up and setting it to '0' fixes it
  const fixedPathData = fixArcsRotation(path)
  const pathData = pathDataToString(fixedPathData);
  const segments = getSegments(pathData, path);

  const segmentsData: SegmentData[] = [];
  const startPosition = {
    absolute: { x: 0, y: 0 },
    original: { x: 0, y: 0 },
  };

  segments.forEach((segment, i) => {
    if (segment.command.toLowerCase() === Move.command) {
      startPosition.absolute = getSegmentPoints([], segment.absolute).start;
      startPosition.original = getSegmentPoints([], segment.original).start;
      return;
    }

    const prevSeg = segments[i - 1] as Segment | undefined;
    const { start, end } = getSegmentPoints(segment.absolute, prevSeg?.absolute);
    const segmentPath = getSegmentPath(start, segment.absolute.join(' '));

    segmentsData.push({
      id: `${path.fullName}-${i}`,
      command: segment.command,
      marker: getMarkerData(end),
      segment: {
        path: segment.closed ? `${segmentPath} Z` : segmentPath,
        data: segment.data,
        absolute: getSegment(segment, segment.absolute, prevSeg?.absolute, startPosition.absolute),
        original: getSegment(segment, segment.original, prevSeg?.original, startPosition.original),
      },
      path: getPathData(path, pathData),
    });
  });

  return segmentsData;
}
