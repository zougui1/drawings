import { Command, CommandJSON } from './Command';
import { CommandType, LineType } from './commandTypes';
import { parseSegment, safeNumber } from '../utils';

const linePlaceholder = 'line(x, y)';
const verticalLinePlaceholder = 'line(undefined, y)';
const horizontalLinePlaceholder = 'line(x)';

export class Line extends Command {
  public static readonly commands: Readonly<Record<LineType, string>> = {
    [LineType.horizontalLine]: 'h',
    [LineType.line]: 'l',
    [LineType.verticalLine]: 'v',
  };

  protected _x?: number;
  protected _y?: number;
  public readonly commandType: LineType;
  public readonly placeholder: string = linePlaceholder;

  public constructor(x?: number, y?: number) {
    super();

    this._x = safeNumber(x);
    this._y = safeNumber(y);

    if (this._x !== undefined && this._y !== undefined) {
      this.commandType = LineType.line;
    } else if (this._x !== undefined) {
      this.commandType = LineType.horizontalLine;
    } else if (this._y !== undefined) {
      this.commandType = LineType.verticalLine;
    } else {
      throw new Error(`Line must have at least x or y be a valid number. Got x: "${this._x}" and y: "${this._y}".`);
    }

    this.placeholder = Line.getCommandPlaceholder(this.commandType);
  }

  //#region public API
  get x(): number | undefined {
    return this._x;
  }

  get y(): number | undefined {
    return this._y;
  }

  public static getCommandPlaceholder(type: LineType): string {
    switch (type) {
      case LineType.line:
        return linePlaceholder;
      case LineType.horizontalLine:
        return horizontalLinePlaceholder;
      case LineType.verticalLine:
        return verticalLinePlaceholder;
    }
  }
  //#endregion

  //#region parsing
  public toString(): string {
    const command = this.getCommand(Line.commands[this.commandType]);

    switch (this.commandType) {
      case LineType.line:
        return `${command} ${this._x},${this._y}`;
      case LineType.horizontalLine:
        return `${command} ${this._x}`;
      case LineType.verticalLine:
        return `${command} ${this._y}`;
    }
  }

  public static fromString(segment: string): Line {
    const [position, x, y] = parseSegment(segment);
    return new Line(x, y).setPosition(position);
  }

  public toJSON(): LineJSON {
    return {
      type: CommandType.line,
      position: this._position,
      x: this._x,
      y: this._y,
      name: this._name,
      stackFrame: this._stackFrame,
    };
  }
  //#endregion
}

export interface LineJSON extends CommandJSON {
  type: CommandType.line;
  x?: number;
  y?: number;
}
