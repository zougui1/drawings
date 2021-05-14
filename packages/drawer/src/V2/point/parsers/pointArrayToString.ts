import { pointToString } from './pointToString';
import { PointJSON } from '../Point';

export const pointArrayToString = (points: PointJSON[]): string => {
  return points.map(p => pointToString(p)).join(' ');
}
