import stackTrace, { StackFrame } from 'stack-trace';

import { CommandType } from './commandTypes';
import { IStackFrame } from '../types';
import { PROJECT_DIR } from '../constants';

export enum Position {
  ABSOLUTE = 'ABSOLUTE',
  RELATIVE = 'RELATIVE',
}

export class Command {

  static rePathSeparation = /[ ,\n]+/g;
  static type: CommandType = CommandType.command;
  position: Position = Position.RELATIVE;
  protected _name: string | undefined;
  public stackFrame: IStackFrame | undefined;
  public readonly commandType: string = CommandType.command;

  constructor() {
    const [stackFrame] = stackTrace.parse(new Error()).filter(frame => {
      return !frame.getFileName()?.startsWith(PROJECT_DIR);
    });

    if (stackFrame) {
      this.stackFrame = {
        lineNumber: stackFrame.getLineNumber(),
        columnNumber: stackFrame.getColumnNumber(),
        fileName: stackFrame.getFileName(),
        functionName: stackFrame.getFunctionName(),
      };
    }
  }

  //#region edit command
  absolute(): this {
    this.position = Position.ABSOLUTE;
    return this;
  }

  relative(): this {
    this.position = Position.RELATIVE;
    return this;
  }

  name(name: string): this {
    this._name = name;
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
