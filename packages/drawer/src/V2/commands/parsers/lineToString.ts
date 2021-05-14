import { Position } from '../Position';
import { LineJSON } from '../Line';
import { pointToString, PointJSON } from '../../point';

const getLineCommand = (point: { x?: number, y?: number }, position: Position): string => {
  const isAbsolute = position === Position.absolute;

  if (point.x !== undefined && point.y !== undefined) {
    return isAbsolute ? 'L' : 'l';
  }
  if (point.x !== undefined) {
    return isAbsolute ? 'H' : 'h';
  }
  if (point.y !== undefined) {
    return isAbsolute ? 'V' : 'v';
  }

  throw new Error(`Lines must have at least x or y be a valid number. Got x: "${point.x}" and y: "${point.y}".`);
}

const getLineCoords = (point: { x?: number, y?: number }): string => {
  if (point.x !== undefined && point.y !== undefined) {
    return pointToString(point as PointJSON);
  }
  if (point.x !== undefined) {
    return `${point.x}`;
  }
  if (point.y !== undefined) {
    return `${point.y}`;
  }

  throw new Error(`Lines must have at least x or y be a valid number. Got x: "${point.x}" and y: "${point.y}".`);
}

export const lineToString = (line: LineData): string => {
  const { position } = line;
  const command = getLineCommand({ x: line.x, y: line.y }, position);
  const coords = getLineCoords({ x: line.x, y: line.y });

  return `${command} ${coords}`;
}

type LineData = Pick<LineJSON, 'x' | 'y' | 'position'>;
