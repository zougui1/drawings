import { TypedCommandObject } from './TypedCommandObject';
import { PathDataArray } from '../PathData';

export interface SegmentData {
  id: string;
  marker: {
    radius: number,
    strokeWidth: number,
    position: { x: number, y: number },
    path: string,
  };
  command: string;
  path: {
    name: string,
    zIndex: number,
    stroke: string,
    fill: string,
    strokeWidth: number,
    pathData: PathDataArray,
    path: string,
  };
  segment: {
    path: string,
    data: TypedCommandObject,
    absolute: Segment,
    original: Segment,
  };
}

interface Segment {
  start: { x: number, y: number };
  end: { x: number, y: number };
  close: { x: number, y: number } | null;
  data: any[];
}
