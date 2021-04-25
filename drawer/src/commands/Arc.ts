import { Command, Position } from './Command';
import { Point, PointObject } from '../point';

export class Arc extends Command {
  public static readonly type: 'arc' = 'arc';
  public static readonly commands: Record<Position, string> = { [Position.RELATIVE]: 'a', [Position.ABSOLUTE]: 'A' };
  public static readonly commandCount: number = 1;

  public point: Point;
  public _radius: Point = new Point(0, 0);
  protected _rotation: number = 0;
  protected _sweep: boolean = false;
  protected _large: boolean = false;

  public constructor(x: number = 0, y: number = 0) {
    super();

    this.point = new Point(x, y);
  }

  //#region public API
  public get x(): number {
    return this.point.x;
  }

  public get y(): number {
    return this.point.y;
  }

  public static is(value: unknown): value is Arc {
    return value instanceof Arc;
  }

  public static isCommand(value: any): value is ArcObject {
    return value?.type === Arc.type;
  }
  //#endregion

  //#region edit command
  public setX(x: number): this {
    this.point.x = x;
    return this;
  }

  public setY(y: number): this {
    this.point.y = y;
    return this;
  }

  public radius(x: number, y: number = x): this {
    this._radius = new Point(x, y);
    return this;
  }

  public rotation(rotation: number): this {
    this._rotation = rotation;
    return this;
  }

  public sweep(sweep: boolean = true): this {
    this._sweep = sweep;
    return this;
  }

  public large(large: boolean = true): this {
    this._large = large;
    return this;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    const command = this.getCommand(Arc.commands);
    const radius = this._radius.toString();
    const rotation = this._rotation;
    const largeArc = Number(this._large);
    const sweep = Number(this._sweep);
    const point = this.point.toString();

    return `${command} ${radius} ${rotation} ${largeArc} ${sweep} ${point}`;
  }

  public toObject(): ArcObject {
    return {
      type: Arc.type,
      position: this.position,
      point: this.point.toObject(),
      radius: this._radius.toObject(),
      rotation: this._rotation,
      sweep: this._sweep,
      large: this._large,
    };
  }

  public static fromObject(data: ArcObject): Arc {
    const arc = new Arc(data.point.x, data.point.y).setPosition(data.position);
    arc._radius = Point.fromObject(data.radius);
    arc._rotation = data.rotation;
    arc._sweep = data.sweep;
    arc._large = data.large;

    return arc;
  }

  public static fromString(segment: string): Arc {
    // TODO validation checks
    const [position, rx, ry, rotation, large, sweep, x, y] = this.parseSegment(segment);
    const arc = new Arc(x, y)
      .setPosition(position)
      .large(Boolean(large))
      .sweep(Boolean(sweep))
      .rotation(rotation)
      .radius(rx, ry);

    return arc;
  }
  //#endregion
}

export interface ArcObject {
  type: 'arc',
  position: Position;
  radius: PointObject;
  point: PointObject;
  rotation: number;
  sweep: boolean;
  large: boolean;
}
