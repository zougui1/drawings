import { Command, Position } from './Command';

export class Close extends Command {
  static type: 'close' = 'close';
  static commands = { [Position.RELATIVE]: 'z', [Position.ABSOLUTE]: 'Z' };
  static commandCount = 1;

  constructor() {
    super();
  }

  //#region public API
  get x(): number {
    throw new Error('Close commands have no coordinates.');
  }

  get y(): number {
    throw new Error('Close commands have no coordinates.');
  }

  static is(value: any): value is Close {
    return value instanceof Close;
  }

  static isCommand(command: string): boolean {
    return command === Close.commands[Position.ABSOLUTE] || command === Close.commands[Position.RELATIVE];
  }
  //#endregion

  //#region parsing
  toString(): string {
    return this.getCommand(Close.commands);
  }

  static fromString(segment: string): Close {
    const [position] = this.parseSegment(segment);
    const close = new Close().setPosition(position);

    return close;
  }

  toObject(): CloseObject {
    return {
      type: Close.type,
      position: this.position,
    };
  }

  static fromObject(data: CloseObject): Close {
    const close = new Close().setPosition(data.position);
    return close;
  }
  //#endregion
}

export interface CloseObject {
  type: 'close';
  position: Position;
}
