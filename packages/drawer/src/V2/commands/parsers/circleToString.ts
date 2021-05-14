import { arcToString } from './arcToString';
import { Position } from '../Position';
import { CircleJSON } from '../Circle';

export const circleToString = (circle: CircleData): string => {
  const { position, rotation, point, radius } = circle;
  const isAbsolute = position === Position.absolute;

  const arcCommand = arcToString({
    radius,
    position,
    rotation,
    large: true,
    sweep: false,
    point: isAbsolute ? { x: point.x, y: point.y + 1 } : { x: 0, y: 1 },
  });

  return `${arcCommand}\nZ`;
}

type CircleData = Pick<CircleJSON, 'position' | 'rotation' | 'radius' | 'point'>;
