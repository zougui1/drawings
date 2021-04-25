import { Command, Position, Algorithm } from './Command';
import { catmullRomToBezier } from './algorithms';
import { Point, PointObject, PointArray } from '../point';
import { trimToNaN } from '../utils';

export class Curve extends Command {
  static type: 'curve' = 'curve';
  static lineCommands = { [Position.RELATIVE]: 'l', [Position.ABSOLUTE]: 'L' };
  static quadraticCommands = { [Position.RELATIVE]: 'q', [Position.ABSOLUTE]: 'Q' };
  static cubicCommands = { [Position.RELATIVE]: 'c', [Position.ABSOLUTE]: 'C' };
  static commandCount = 1;

  static catmullRomToBezier = catmullRomToBezier;

  private points: PointArray;
  private _offset: Point = new Point(0, 0);
  private algorithm: Algorithm = Algorithm.BEZIER;

  constructor(...numbers: number[]) {
    super();

    if (numbers.length < 2) {
      throw new Error('Curve must have at least two coordinates.');
    }

    this.points = new PointArray(numbers);
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

  catmullRom(): this {
    this.algorithm = Algorithm.CATMULL_ROM;
    return this;
  }
  //#endregion

  //#region parsing
  protected catmullRomToString(points: PointArray): string {
    if (points.length < 3) {
      throw new Error('Catmull-Rom spline must have at least three points.');
    }

    const coords = points.toCoords();
    const command = this.getCommand(Curve.cubicCommands);

    return catmullRomToBezier(coords, false)
      .map(curve => `${command} ${new PointArray(curve).toString()}`)
      .join('\n');
  }

  protected bezierToString(points: PointArray): string {
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

  toString(): string {
    const points = this.points.offsetAll(this._offset);

    switch (this.algorithm) {
      case Algorithm.CATMULL_ROM:
        return this.catmullRomToString(points);

      default:
        return this.bezierToString(points);
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
      algorithm: this.algorithm,
      offset: this._offset.toObject(),
      points: this.points.toArray(),
    };
  }

  static fromObject(data: CurveObject): Curve {
    const curve = new Curve(0, 0).setPosition(data.position);
    curve.points = PointArray.fromArray(data.points);
    curve.algorithm = data.algorithm;
    curve._offset = Point.fromObject(data.offset);

    return curve;
  }
  //#endregion
}

export interface CurveObject {
  type: 'curve';
  position: Position;
  points: PointObject[];
  offset: PointObject;
  algorithm: Algorithm;
}
