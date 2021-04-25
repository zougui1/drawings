import svgpath from 'svgpath';

import { Path, PathObject } from './elements';
import {
  Move,
  Close,
  Rect,
  Circle,
} from './commands';
import { SegmentData, TypedCommandObject } from './types';

const RADIUS = 5;

export const getSegmentsData = (path: PathObject): SegmentData[] => {
  const pathData = Path.fromObject(path).pathData.toString();
  const segments: Segment[] = [];

  let indexOffset = 0;

  const fillSegments = (type: string) => (segment: any[], index: number) => {
    segments[index] ??= {} as Segment;
    segments[index].command ??= segment[0];
    segments[index].data ??= path.pathData[index + indexOffset];
    segments[index][type] ??= segment;

    if (indexOffset < 0) {
      indexOffset++;
    }

    if (indexOffset >= 0) {
      if (Circle.is(segment[0])) {
        indexOffset = -1;
      } else if (Rect.is(segment[0])) {
        indexOffset = -4;
      }
    }
  }

  svgpath(pathData).iterate(fillSegments('original'));
  svgpath(pathData).abs().iterate(fillSegments('absolute'));

  const segmentsData: SegmentData[] = [];
  const startPosition = {
    absolute: { x: 0, y: 0 },
    original: { x: 0, y: 0 },
  };

  let pathDataIndex = 0;

  segments.forEach((segment, i) => {
    if (Close.isCommand(segment.command)) {
      return;
    }

    if (Move.isCommand(segment.command)) {
      startPosition.absolute = {
        x: segment.absolute[1],
        y: segment.absolute[2]
      };
      startPosition.original = {
        x: segment.original[1],
        y: segment.original[2]
      };
    }

    const pathObject = path.pathData[pathDataIndex];

    const prevSeg = segments[i - 1] as Segment | undefined;
    const nextSeg = segments[i + 1] as Segment | undefined;

    const [startX, startY] = prevSeg?.absolute.slice(-2) ?? [0, 0];
    const [origStartX, origStartY] = prevSeg?.original.slice(-2) ?? [0, 0];
    const [endX, endY] = segment.absolute.slice(-2);
    const [origEndX, origEndY] = segment.original.slice(-2);

    const markerPosition = {
      x: endX + RADIUS,
      y: endY - 0.5,
    };

    const markerPath = new Path({})
      .move(markerPosition.x, markerPosition.y).absolute()
      .circle(RADIUS).absolute();

    const segmentPath = new Path({})
      .move(startX, startY).absolute()
      .fromString(segment.absolute.join(' '));

    const isNextSegmentClose = Close.isCommand(nextSeg?.command ?? '');

    segmentsData.push({
      id: `${path.name}-${path.id}-${i}`,
      command: segment.command,
      marker: {
        path: markerPath.pathData.toString(),
        radius: RADIUS,
        strokeWidth: 3,
        position: markerPosition,
      },
      segment: {
        path: segmentPath.pathData.toString(),
        data: pathObject,
        absolute: {
          // @ts-ignore
          startPosition: startPosition.absolute,
          start: { x: startX, y: startY },
          end: { x: endX, y: endY },
          close: isNextSegmentClose ? startPosition.absolute : null,
          data: segment.absolute,
        },
        original: {
          start: { x: origStartX, y: origStartY },
          end: { x: origEndX, y: origEndY },
          close: isNextSegmentClose ? startPosition.original : null,
          data: segment.original,
        },
      },
      path: {
        name: path.name,
        zIndex: path.zIndex,
        stroke: path.stroke,
        fill: path.fill,
        strokeWidth: path.strokeWidth,
        pathData: path.pathData,
        path: pathData,
      },
    });
  });

  return segmentsData;
}

interface Segment {
  absolute: any[];
  original: any[];
  command: string;
  data: TypedCommandObject;
  [index: string]: any[] | string | TypedCommandObject;
}
