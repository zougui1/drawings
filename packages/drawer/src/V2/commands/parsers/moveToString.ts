import { Position } from '../Position';
import { MoveJSON } from '../Move';
import { pointToString } from '../../point';

export const moveToString = (move: MoveData): string => {
  const { position } = move;
  const point = pointToString(move.point);
  const command = position === Position.absolute ? 'M' : 'm';

  return `${command} ${point}`;
}

type MoveData = Pick<MoveJSON, 'point' | 'position'>;
