import { Command, Position } from './Command';
import { CommandType, CurveType } from './commandTypes';
import { Point, PointObject, PointArray } from '../point';
import { trimToNaN } from '../utils';

export class Curve extends Command {
  static type: CommandType.curve = CommandType.curve;
  static lineCommands = { [Position.RELATIVE]: 'l', [Position.ABSOLUTE]: 'L' };
  static quadraticCommands = { [Position.RELATIVE]: 'q', [Position.ABSOLUTE]: 'Q' };
  static cubicCommands = { [Position.RELATIVE]: 'c', [Position.ABSOLUTE]: 'C' };
  static commandCount = 1;

  private points: PointArray;
  private _offset: Point = new Point(0, 0);
  public readonly commandType: CurveType;

  constructor(...numbers: number[]) {
    super();

    if (numbers.length < 2) {
      throw new Error('Curve must have at least two coordinates.');
    }

    this.points = new PointArray(numbers);

    switch (this.points.length) {
      case 1:
        this.commandType = CurveType.line;
        break;
      case 2:
        this.commandType = CurveType.quadraticCurve;
        break;
      case 3:
        this.commandType = CurveType.bezierCurve;
        break;

      default:
        throw new Error(`Curves only accept 1, 2 and 3 points. Got ${this.points.length} points.`);
    }
  }

  //#region public API
  get x(): number {
    return this.lastPoint().x;
  }

  get y(): number {
    return this.lastPoint().y;
  }

  static is(value: any): value is Curve {
    return value instanceof Curve;
  }
  //#endregion

  //#region helpers
  protected lastPoint(): Point {
    return this.points.last() as Point;
  }
  //#endregion

  //#region edit command
  offsetX(offsetX: number): this {
    this._offset.x = offsetX;
    return this;
  }

  offsetY(offsetY: number): this {
    this._offset.y = offsetY;
    return this;
  }

  offset(offsetX: number, offsetY: number = 0): this {
    this._offset.set(offsetX, offsetY);
    return this;
  }
  //#endregion

  //#region parsing
  toString(): string {
    const points = this.points.offsetAll(this._offset);

    switch (points.length) {
      case 1:
        return `${this.getCommand(Curve.lineCommands)} ${points.toString()}`;
      case 2:
        return `${this.getCommand(Curve.quadraticCommands)} ${points.toString()}`;
      case 3:
        return `${this.getCommand(Curve.cubicCommands)} ${points.toString()}`;

      default:
        throw new Error('Bezier curve does not support more than three points.');
    }
  }

  static fromString(segment: string): Curve {
    const [position, ...numbers] = this.parseSegment(segment);
    const curve = new Curve(...trimToNaN(numbers)).setPosition(position);

    return curve;
  }

  toObject(): CurveObject {
    return {
      type: Curve.type,
      position: this.position,
      offset: this._offset.toObject(),
      points: this.points.toArray(),
    };
  }

  static fromObject(data: CurveObject): Curve {
    const curve = new Curve(0, 0).setPosition(data.position);
    curve.points = PointArray.fromArray(data.points);
    curve._offset = Point.fromObject(data.offset);

    return curve;
  }
  //#endregion
}

export interface CurveObject {
  type: CommandType.curve;
  position: Position;
  points: PointObject[];
  offset: PointObject;
}
