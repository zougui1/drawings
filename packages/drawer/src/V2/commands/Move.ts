import { Command, CommandJSON } from './Command';
import { CommandType } from './commandTypes';
import { Point, PointJSON } from '../point';
import { parseSegment } from '../utils';

const movePlaceholder = 'move(x, y)';

export class Move extends Command {
  public static readonly command: string = 'm';

  protected _point: Point;
  public readonly commandType: CommandType.move = CommandType.move;
  public readonly placeholder: string = movePlaceholder;

  public constructor(x: number, y: number) {
    super();

    this._point = new Point(x, y);
  }

  //#region public API
  public get x(): number {
    return this._point.x;
  }

  public get y(): number {
    return this._point.y;
  }

  public static getCommandPlaceholder(): string {
    return movePlaceholder;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    return `${this.getCommand(Move.command)} ${this._point.toString()}`;
  }

  public static fromString(segment: string): Move {
    const [position, x, y] = parseSegment(segment);
    return new Move(x, y).setPosition(position);
  }

  public toJSON(): MoveJSON {
    return {
      type: CommandType.move,
      position: this._position,
      point: this._point.toJSON(),
      name: this._name,
      stackFrame: this._stackFrame,
    };
  }
  //#endregion
}

export interface MoveJSON extends CommandJSON {
  type: CommandType.move;
  point: PointJSON;
}
