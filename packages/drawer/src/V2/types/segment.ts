import { CommandJSON } from '../commands';
import { AnimationElementJSON } from '../animation-elements';

export interface SegmentData {
  id: string;
  marker: {
    radius: number,
    strokeWidth: number,
    position: { x: number, y: number },
    path: string,
    //animations: AnimationElementJSON[],
  };
  command: string;
  path: {
    name: string,
    zIndex: number,
    stroke: string,
    fill: string,
    strokeWidth: number,
    pathData: CommandJSON[],
    path: string,
    isAnimated: boolean,
  };
  segment: {
    path: string,
    data: CommandJSON,
    absolute: PartialSegmentData,
    original: PartialSegmentData,
  };
}

export interface PartialSegmentData {
  startPosition: { x: number, y: number };
  start: { x: number, y: number };
  end: { x: number, y: number };
  close: { x: number, y: number } | null;
  data: any[];
}
