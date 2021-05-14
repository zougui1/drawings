import { Command, Position } from './Command';
import { CommandType } from './commandTypes';
import { Move } from './Move';
import { Line } from './Line';
import { Point, PointObject } from '../point';

export class Rect extends Command {

  public static readonly type: CommandType.rect = CommandType.rect;
  public static readonly commandCount: number = 5;

  private _point: Point;
  private _size: Point;
  public readonly commandType: CommandType.rect = CommandType.rect;

  public constructor(x: number, y: number, width: number, height: number) {
    super();
    this._point = new Point(x, y);
    this._size = new Point(width, height);
  }

  //#region public API
  public get x(): number {
    return this._point.x;
  }

  public get y(): number {
    return this._point.y;
  }

  public static is(value: any): value is Rect {
    return value instanceof Rect;
  }

  public static isCommand(value: any): value is RectObject {
    return value?.type === Rect.type;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    const startX = this._point.x;
    const startY = this._point.y;
    const endX = this._point.x + this._size.x;
    const endY = this._point.y + this._size.y;

    const start = new Move(startX, startY).setPosition(this.position);
    const topLine = new Line(endX, startY).setPosition(this.position);
    const rightLine = new Line(endX, endY).setPosition(this.position);
    const bottomLine = new Line(startX, endY).setPosition(this.position);
    const leftLine = new Line(startX, startY).setPosition(this.position);

    return [start, topLine, rightLine, bottomLine, leftLine].join('\n');
  }

  public toObject(): RectObject {
    return {
      type: Rect.type,
      position: this.position,
      point: this._point.toObject(),
      size: this._size.toObject(),
    };
  }

  public static fromObject(data: RectObject): Rect {
    const move = new Rect(data.point.x, data.point.y, data.size.x, data.size.y).setPosition(data.position);
    return move;
  }
  //#endregion
}

export interface RectObject {
  type: CommandType.rect;
  position: Position;
  point: PointObject;
  size: PointObject;
}
