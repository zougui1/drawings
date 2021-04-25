export enum Position {
  ABSOLUTE = 'ABSOLUTE',
  RELATIVE = 'RELATIVE',
}

export enum Algorithm {
  BEZIER = 'BEZIER',
  CATMULL_ROM = 'CATMULL_ROM',
}

export class Command {

  static rePathSeparation = /[ ,\n]+/g;
  static type = 'command';
  position: Position = Position.RELATIVE;

  //#region edit command
  absolute(): this {
    this.position = Position.ABSOLUTE;
    return this;
  }

  relative(): this {
    this.position = Position.RELATIVE;
    return this;
  }

  setPosition(position: Position): this {
    this.position = position;
    return this;
  }
  //#endregion

  //#region public API
  get x(): number | undefined {
    throw Command.notImplementedError('x', this.getCommandName());
  }

  get y(): number | undefined {
    throw Command.notImplementedError('y', this.getCommandName());
  }

  static is(value: any): value is Command {
    return value instanceof Command;
  }
  //#endregion

  //#region parsing
  toString(): string {
    throw Command.notImplementedError('toString', this.getCommandName());
  }

  toObject(): any {
    throw Command.notImplementedError('toObject', this.getCommandName());
  }

  static fromObject(data: any): Command {
    throw Command.notImplementedError('fromObject', data.type);
  }
  //#endregion

  //#region helpers
  getCommandName(): string {
    return this.constructor.name;
  }

  protected getCommand(commands: { [index: string]: string }): string {
    const command = commands[this.position];

    if (!command) {
      throw new Error(`Expect a command for the position "${this.position}".`);
    }

    return command;
  }

  private static notImplementedError(methodName: string, commandName: string): Error {
    return new Error(`${methodName} not implemented for the command "${commandName}".`)
  }

  protected static parseSegment(segment: string): [Position, ...number[]] {
    const [command, ...numberStrings] = segment
      .replace(Command.rePathSeparation, ' ')
      .split(' ');
    const position = command.toUpperCase() === command
      ? Position.ABSOLUTE
      : Position.RELATIVE;
    const numbers = numberStrings.map(num => Number(num));


    return [position, ...numbers];
  }
  //#endregion
}
