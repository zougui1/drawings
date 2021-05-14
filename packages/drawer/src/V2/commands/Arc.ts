import { Command, CommandJSON } from './Command';
import { CommandType } from './commandTypes';
import { Point, PointJSON } from '../point';

const arcPlaceholder = 'arc(x, y).radius(rx[, ry])';

export class Arc extends Command {
  public static readonly command: string = 'a';

  protected _point: Point;
  protected _radius: Point = new Point(0, 0)
  protected _rotation: number = 0;
  protected _sweep: boolean = false;
  protected _large: boolean = false;
  public readonly commandType: CommandType.arc = CommandType.arc;
  public readonly placeholder: string = arcPlaceholder;

  public constructor(x: number = 0, y: number = 0) {
    super();

    this._point = new Point(x, y);
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

  public sweep(sweep: boolean = true): this {
    this._sweep = sweep;
    return this;
  }

  public large(large: boolean = true): this {
    this._large = large;
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

  public static isArcJSON(data: Record<string, any>): data is ArcJSON {
    return data.type === CommandType.arc;
  }

  public static getCommandPlaceholder(): string {
    return arcPlaceholder;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    const command = this.getCommand(Arc.command);
    const radius = this._radius.toString();
    const rotation = this._rotation;
    const large = Number(this._large);
    const sweep = Number(this._sweep);
    const point = this._point.toString();

    return `${command} ${radius} ${rotation} ${large} ${sweep} ${point}`;
  }

  public toJSON(): ArcJSON {
    return {
      type: CommandType.arc,
      position: this._position,
      point: this._point.toJSON(),
      radius: this._radius.toJSON(),
      rotation: this._rotation,
      sweep: this._sweep,
      large: this._large,
      name: this._name,
      stackFrame: this._stackFrame,
    };
  }

  public static fromJSON(data: ArcJSON): Arc {
    const arc = new Arc(data.point.x, data.point.y)
      .setPosition(data.position)
      .setName(data.name);
    arc._radius = Point.fromJSON(data.radius);
    arc._rotation = data.rotation;
    arc._sweep = data.sweep;
    arc._large = data.large;

    return arc;
  }
  //#endregion
}

export interface ArcJSON extends CommandJSON {
  type: CommandType.arc,
  radius: PointJSON;
  point: PointJSON;
  rotation: number;
  sweep: boolean;
  large: boolean;
}
