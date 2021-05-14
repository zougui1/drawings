import { Position } from '../Position';
import { ArcJSON } from '../Arc';
import { pointToString } from '../../point';

export const arcToString = (arc: ArcData): string => {
  const { position, rotation } = arc;
  const radius = pointToString(arc.radius);
  const point = pointToString(arc.point);
  const large = Number(arc.large);
  const sweep = Number(arc.sweep);
  const command = position === Position.absolute ? 'A' : 'a';

  return `${command} ${radius} ${rotation} ${large} ${sweep} ${point}`;
}

type ArcData = Pick<ArcJSON, 'position' | 'rotation' | 'radius' | 'large' | 'sweep' | 'point'>;
