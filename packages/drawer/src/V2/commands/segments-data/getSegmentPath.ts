import { Position } from '../Position';
import { moveToString } from '../parsers';

export const getSegmentPath = (start: { x: number, y: number }, segment: string): string => {
  const move = moveToString({
    point: start,
    position: Position.absolute,
  });

  return `${move} ${segment}`;
}
