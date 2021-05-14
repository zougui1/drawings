import { Command, CommandJSON } from './Command';
import { Move } from './Move';
import { Line } from './Line';
import { CommandType } from './commandTypes';
import { Point, PointJSON } from '../point';

const rectPlaceholder = 'rect(x, y, width, height)';

export class Rect extends Command {
  public static readonly command: string = 'm';

  protected _point: Point;
  protected _size: Point;
  public readonly commandType: CommandType.rect = CommandType.rect;
  public readonly placeholder: string = rectPlaceholder;

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

  public static isRectJSON(data: Record<string, any>): data is RectJSON {
    return data.type === CommandType.rect;
  }

  public static getCommandPlaceholder(): string {
    return rectPlaceholder;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    const startX = this._point.x;
    const startY = this._point.y;
    const endX = this._point.x + this._size.x;
    const endY = this._point.y + this._size.y;

    const start = new Move(startX, startY).setPosition(this._position);
    const topLine = new Line(endX, startY).setPosition(this._position);
    const rightLine = new Line(endX, endY).setPosition(this._position);
    const bottomLine = new Line(startX, endY).setPosition(this._position);
    const leftLine = new Line(startX, startY).setPosition(this._position);

    return [start, topLine, rightLine, bottomLine, leftLine].join('\n');
  }

  public toJSON(): RectJSON {
    return {
      type: CommandType.rect,
      position: this._position,
      point: this._point.toJSON(),
      size: this._size.toJSON(),
      name: this._name,
      stackFrame: this._stackFrame,
    };
  }
  //#endregion
}

export interface RectJSON extends CommandJSON {
  type: CommandType.rect;
  point: PointJSON;
  size: PointJSON;
}
