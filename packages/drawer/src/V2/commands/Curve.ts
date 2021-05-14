import { Command, CommandJSON } from './Command';
import { CommandType, CurveType } from './commandTypes';
import { PointArray, Point, PointJSON } from '../point';
import { parseSegment, trimToNaN } from '../utils';

const lineCurvePlaceholder = 'curve(x, y)';
const quadraticCurvePlaceholder = 'curve(cpx, cpy, x, y)';
const bezierCurvePlaceholder = 'curve(cpx1, cpy1, cpx2, cpy2, x, y)';

export class Curve extends Command {
  public static readonly commands: Readonly<Record<CurveType, string>> = {
    [CurveType.line]: 'l',
    [CurveType.quadraticCurve]: 'q',
    [CurveType.bezierCurve]: 'c',
  };

  protected _points: PointArray;
  protected _offset: Point = new Point(0, 0);
  public readonly commandType: CurveType;
  public readonly placeholder: string = bezierCurvePlaceholder;

  public constructor(...numbers: number[]) {
    super();

    if (numbers.length < 2) {
      throw new Error(`Curves must have at least 2 coordinates. Got "${numbers.length}".`);
    }

    this._points = new PointArray(numbers);

    this.commandType = this.getCommandType();
    this.placeholder = Curve.getCommandPlaceholder(this.commandType);
  }

  //#region public API
  get x(): number | undefined {
    return this._points.last()?.x;
  }

  get y(): number | undefined {
    return this._points.last()?.y;
  }

  public static getCommandPlaceholder(type: CurveType): string {
    switch (type) {
      case CurveType.line:
        return lineCurvePlaceholder;
      case CurveType.quadraticCurve:
        return quadraticCurvePlaceholder;
      case CurveType.bezierCurve:
        return bezierCurvePlaceholder;
    }
  }
  //#endregion

  //#region helpers
  protected lastPoint(): Point {
    return this._points.last() as Point;
  }

  protected getCommandType(): CurveType {
    switch (this._points.length) {
      case 1:
        return CurveType.line;
      case 2:
        return CurveType.quadraticCurve;
      case 3:
        return CurveType.bezierCurve;

      default:
        throw new Error(`Curves only accept 1, 2 and 3 points. Got ${this._points.length} points.`);
    }
  }
  //#endregion

  //#region edit command
  public offset(x: number, y: number = 0): this {
    this._offset = new Point(x, y);
    return this;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    const points = this._points.offsetAll(this._offset);
    return `${this.getCommand(Curve.commands[this.getCommandType()])} ${points.toString()}`;
  }

  public static fromString(segment: string): Curve {
    const [position, ...numbers] = parseSegment(segment);
    return new Curve(...trimToNaN(numbers)).setPosition(position);
  }

  public toJSON(): CurveJSON {
    return {
      type: CommandType.curve,
      position: this._position,
      offset: this._offset.toJSON(),
      points: this._points.toJSON(),
      name: this._name,
      stackFrame: this._stackFrame,
    };
  }
  //#endregion
}

export interface CurveJSON extends CommandJSON {
  type: CommandType.curve;
  points: PointJSON[];
  offset: PointJSON;
}
