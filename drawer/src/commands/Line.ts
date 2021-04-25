import { Command, Position } from './Command';

export class Line extends Command {
  static type: 'line' = 'line';
  static hCommands = { [Position.RELATIVE]: 'h', [Position.ABSOLUTE]: 'H' };
  static vCommands = { [Position.RELATIVE]: 'v', [Position.ABSOLUTE]: 'V' };
  static commands = { [Position.RELATIVE]: 'l', [Position.ABSOLUTE]: 'L' };
  static commandCount = 1;

  protected _x?: number;
  protected _y?: number;

  constructor(x?: number, y?: number) {
    super();
    this._x = isNaN(Number(x)) ? undefined : x;
    this._y = isNaN(Number(y)) ? undefined : y;
  }

  //#region public API
  get x(): number | undefined {
    return this._x;
  }

  get y(): number | undefined {
    return this._y;
  }

  static is(value: any): value is Line {
    return value instanceof Line;
  }
  //#endregion

  //#region edit command
  setX(x: number): this {
    this._x = x;
    return this;
  }

  setY(y: number): this {
    this._y = y;
    return this;
  }
  //#endregion

  //#region parsing
  toString(): string {
    if (this._y == null && this._x == null) {
      throw new Error(`Line must have at least one coordinate.`);
    }

    if (this._y == null) {
      return `${this.getCommand(Line.hCommands)} ${this._x}`;
    }

    if (this._x == null) {
      return `${this.getCommand(Line.vCommands)} ${this._y}`;
    }

    return `${this.getCommand(Line.commands)} ${this._x},${this._y}`;
  }

  static fromString(segment: string): Line {
    const [position, x, y] = this.parseSegment(segment);
    const line = new Line(x, y).setPosition(position);

    return line;
  }

  toObject(): LineObject {
    return {
      type: Line.type,
      position: this.position,
      x: this._x,
      y: this._y,
    };
  }

  static fromObject(data: LineObject): Line {
    const line = new Line(data.x, data.y).setPosition(data.position);
    return line;
  }
  //#endregion
}

export interface LineObject {
  type: 'line';
  position: Position;
  x?: number;
  y?: number;
}
