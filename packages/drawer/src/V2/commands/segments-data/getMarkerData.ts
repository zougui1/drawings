import { Position } from '../Position';
import { moveToString, circleToString } from '../parsers';
import { SegmentData } from '../../types';

const RADIUS = 5;

export const getMarkerPath = (position: { x: number, y: number }): string => {
  const move = moveToString({ point: position, position: Position.absolute });
  const circle = circleToString({
    point: position,
    radius: { x: RADIUS, y: RADIUS },
    rotation: 0,
    position: Position.absolute,
  });

  return `${move} ${circle}`;
}

export const getMarkerData = (position: { x: number, y: number }): SegmentData['marker'] => {
  const realPosition = {
    x: position.x + RADIUS,
    y: position.y - 0.5,
  };

  return {
    path: getMarkerPath(realPosition),
    radius: RADIUS,
    strokeWidth: 3,
    position: realPosition,
  };
}
