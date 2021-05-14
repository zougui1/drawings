import { Command, Position } from './Command';
import { CommandType } from './commandTypes';
import { Point, PointObject } from '../point';

export class Move extends Command {

  static type: CommandType.move = CommandType.move;
  static commands = { [Position.RELATIVE]: 'm', [Position.ABSOLUTE]: 'M' };
  static commandCount = 1;

  private point: Point;
  public readonly commandType: CommandType.move = CommandType.move;

  constructor(x: number, y: number) {
    super();
    this.point = new Point(x, y);
  }

  //#region public API
  get x(): number {
    return this.point.x;
  }

  get y(): number {
    return this.point.y;
  }

  static is(value: any): value is Move {
    return value instanceof Move;
  }

  static isCommand(command: string): boolean {
    return command === Move.commands[Position.ABSOLUTE] || command === Move.commands[Position.RELATIVE];
  }
  //#endregion

  //#region parsing
  toString(): string {
    return `${this.getCommand(Move.commands)} ${this.point.toString()}`;
  }

  static fromString(segment: string): Move {
    // TODO validation checks
    const [position, x, y] = this.parseSegment(segment);
    const move = new Move(x, y).setPosition(position);

    return move;
  }

  toObject(): MoveObject {
    return {
      type: Move.type,
      position: this.position,
      point: this.point.toObject(),
    };
  }

  static fromObject(data: MoveObject): Move {
    const move = new Move(data.point.x, data.point.y).setPosition(data.position);
    return move;
  }
  //#endregion
}

export interface MoveObject {
  type: CommandType.move;
  position: Position;
  point: PointObject;
}
