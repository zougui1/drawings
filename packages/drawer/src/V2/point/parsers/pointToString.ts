import { PointJSON } from '../Point';

export const pointToString = (point: PointJSON, join: string = ','): string => {
  return `${point.x}${join}${point.y}`;
}
