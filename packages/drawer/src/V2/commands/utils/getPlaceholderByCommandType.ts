import { Arc } from '../Arc';
import { Circle } from '../Circle';
import { Close } from '../Close';
import { Curve } from '../Curve';
import { Line } from '../Line';
import { Move } from '../Move';
import { Rect } from '../Rect';
import { CommandType, LineType, CurveType } from '../commandTypes';

export const getPlaceholderByCommandType = (type: string): string => {
  switch (type) {
    case CommandType.arc:
      return Arc.getCommandPlaceholder();

    case CommandType.close:
      return Close.getCommandPlaceholder();

    case CommandType.move:
      return Move.getCommandPlaceholder();

    case CommandType.rect:
      return Rect.getCommandPlaceholder();

    case CommandType.circle:
      return Circle.getCommandPlaceholder();

    // we test CurveType before LineType as they both have
    // a common type ('line') and Curve has the priority over Line
    case CurveType.bezierCurve:
    case CurveType.line:
    case CurveType.quadraticCurve:
      return Curve.getCommandPlaceholder(type);

    case LineType.line:
    case LineType.horizontalLine:
    case LineType.verticalLine:
      return Line.getCommandPlaceholder(type);

    default:
      throw new Error(`Unknown command "${type}".`);
  }
}
