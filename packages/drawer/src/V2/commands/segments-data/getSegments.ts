import svgpath from 'svgpath';

import { Segment } from './Segment';
import { Rect } from '../Rect';
import { Circle } from '../Circle';
import { Close } from '../Close';
import { PathJSON } from '../../drawing-elements';

const isCloseSegment = (segment: Segment): boolean => {
  return segment.command.toLowerCase() === Close.command;
}

export const getSegments = (pathData: string, path?: PathJSON): Segment[] => {
  const segments: Segment[] = [];

  let indexOffset = 0;

  const fillSegments = (type: string) => (segment: any[], index: number) => {
    segments[index] ??= {} as Segment;
    segments[index].command ??= segment[0];
    segments[index][type] ??= segment;

    if (path) {
      segments[index].data ??= path.pathData[index + indexOffset];
    }

    if (indexOffset < 0) {
      indexOffset++;
    }

    if (indexOffset >= 0) {
      if (segment[0] instanceof Circle) {
        indexOffset = -1;
      } else if (segment[0] instanceof Rect) {
        indexOffset = -4;
      }
    }
  }

  svgpath(pathData).iterate(fillSegments('original'));
  svgpath(pathData).abs().iterate(fillSegments('absolute'));

  const enhancedSegments = segments
    .map((segment, i) => {
      if (isCloseSegment(segment)) {
        return segment;
      }

      const nextSeg = segments[i + 1] as Segment | undefined;
      segment.closed = (nextSeg?.command ?? '').toLowerCase() === Close.command;

      return segment;
    })
    .filter(seg => !isCloseSegment(seg));

  return enhancedSegments;
}
