import { Command, CommandJSON } from './Command';
import { Position } from './Position';
import { Arc } from './Arc';
import { Close } from './Close';
import { CommandType } from './commandTypes';
import { Point, PointJSON } from '../point';

const circlePlaceholder = 'circle(x, y).radius(rx[, ry])';

export class Circle extends Command {
  protected _point: Point;
  protected _radius: Point;
  protected _rotation: number = 0;
  public readonly commandType: CommandType.circle = CommandType.circle;
  public readonly placeholder: string = circlePlaceholder;

  public constructor(x: number = 0, y: number = 0, rx: number = 0, ry: number = rx) {
    super();

    this._point = new Point(x, y);
    this._radius = new Point(rx, ry);
  }

  //#region edit command
  public radius(rx: number, ry: number = rx): this {
    this._radius = new Point(rx, ry);
    return this;
  }

  public rotation(rotation: number): this {
    this._rotation = rotation;
    return this;
  }
  //#endregion

  //#region public API
  public get x(): number {
    return this._point.x;
  }

  public get y(): number {
    return this._point.y;
  }

  public static isCircleJSON(data: Record<string, any>): data is CircleJSON {
    return data.type === CommandType.circle;
  }

  public static getCommandPlaceholder(): string {
    return circlePlaceholder;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    const x = this._position === Position.absolute ? this._point.x : 0;
    const y = this._position === Position.absolute ? this._point.y + 1 : 1;

    const arc = new Arc(x, y)
      .setPosition(this._position)
      .radius(this._radius.x, this._radius.y)
      .large();

    return `${arc.toString()}\n${new Close().toString()}`;
  }

  public toJSON(): CircleJSON {
    return {
      type: CommandType.circle,
      position: this._position,
      radius: this._radius.toJSON(),
      point: this._point.toJSON(),
      rotation: this._rotation,
      name: this._name,
      stackFrame: this._stackFrame,
    };
  }
  //#endregion
}

export interface CircleJSON extends CommandJSON {
  type: CommandType.circle,
  radius: PointJSON;
  point: PointJSON;
  rotation: number;
}
