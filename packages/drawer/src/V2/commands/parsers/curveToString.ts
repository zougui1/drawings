import { Position } from '../Position';
import { CurveJSON } from '../Curve';
import { pointArrayToString, PointJSON } from '../../point';

const getCurveCommand = (points: PointJSON[], position: Position): string => {
  const isAbsolute = position === Position.absolute;

  switch (points.length) {
    case 1:
      return isAbsolute ? 'L' : 'l';
    case 2:
      return isAbsolute ? 'Q' : 'q';
    case 3:
      return isAbsolute ? 'C' : 'c';

    default:
      throw new Error(`Curves can't have more than 3 points. Got ${points.length} points.`);
  }
}

export const curveToString = (curve: CurveData): string => {
  const { position, offset } = curve;
  const points = curve.points.map(p => {
    return {
      x: p.x + offset.x,
      y: p.y + offset.y,
    };
  });
  const command = getCurveCommand(points, position);

  return `${command} ${pointArrayToString(points)}`;
}

type CurveData = Pick<CurveJSON, 'points' | 'position' | 'offset'>;
