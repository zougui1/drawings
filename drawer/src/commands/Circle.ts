import { Command, Position } from './Command';
import { Arc } from './Arc';
import { Close } from './Close';
import { Point, PointObject } from '../point';

export class Circle extends Command {

  public static readonly type: 'circle' = 'circle';
  public static readonly commandCount: number = 2;

  public point: Point;
  public _radius: Point = new Point(0, 0);
  protected _rotation: number = 0;

  public constructor(x: number = 0, y: number = 0, rx: number = 0, ry: number = 0) {
    super();

    this.point = new Point(x, y);
    this._radius = new Point(rx, ry);
  }

  //#region public API
  public get x(): number {
    return this.point.x;
  }

  public get y(): number {
    return this.point.y;
  }

  public static is(value: unknown): value is Circle {
    return value instanceof Circle;
  }

  public static isCommand(value: any): value is CircleObject {
    return value?.type === Circle.type;
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
  //#endregion

  //#region parsing
  public toString(): string {
    const arc = new Arc(this.point.x, this.point.y)
      .setPosition(this.position)
      .radius(this._radius.x, this._radius.y)
      .large();

    return [arc.toString(), new Close().toString()].join('\n');
  }

  public toObject(): CircleObject {
    return {
      type: Circle.type,
      position: this.position,
      radius: this._radius.toObject(),
      point: this.point.toObject(),
      rotation: this._rotation,
    };
  }

  public static fromObject(data: CircleObject): Circle {
    const curve = new Circle(data.point.x, data.point.y, data.radius.x, data.radius.y).setPosition(data.position);
    curve._rotation = data.rotation;

    return curve;
  }
  //#endregion
}

export interface CircleObject {
  type: 'circle',
  position: Position;
  radius: PointObject;
  point: PointObject;
  rotation: number;
}
