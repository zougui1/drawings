import { CommandType } from './commandTypes';
import { Position } from './Position';
import { IStackFrame } from '../types';
import { getDrawingStackFrame } from '../utils';

export class Command {

  public readonly commandType: string = CommandType.command;
  protected _position: Position = Position.relative;
  protected _name: string | undefined;
  protected _stackFrame: IStackFrame | undefined;
  public readonly placeholder: string = '';

  //#region accessors
  public getPosition(): Position {
    return this._position;
  }

  public setPosition(position: Position): this {
    this._position = position;
    return this;
  }

  public getName(): string | undefined {
    return this._name;
  }

  public setName(name: string | undefined): this {
    this._name = name;
    return this;
  }

  public getStackFrame(): IStackFrame | undefined {
    return this._stackFrame;
  }
  //#endregion

  //#region aliases
  public name(name: string): this {
    return this.setName(name);
  }

  public absolute(): this {
    return this.setPosition(Position.absolute);
  }
  //#endregion

  //#region public API
  get x(): number | undefined {
    throw Command.notImplementedError('x', this.commandType);
  }

  get y(): number | undefined {
    throw Command.notImplementedError('y', this.commandType);
  }

  public init(): void {
    this._stackFrame = getDrawingStackFrame();
  }

  public getFileLocation(): string | undefined {
    if (!this._stackFrame) {
      return;
    }

    return `${this._stackFrame.fileName}:${this._stackFrame.lineNumber}:${this._stackFrame.columnNumber}`;
  }
  //#endregion

  //#region helpers
  protected getCommand(command: string): string {
    return this._position === Position.absolute
      ? command.toUpperCase()
      : command.toLowerCase();
  }
  //#endregion

  //#region parsing
  public toString(): string {
    throw Command.notImplementedError('toString', this.commandType);
  }

  public toJSON(): CommandJSON {
    throw Command.notImplementedError('toJSON', this.commandType);
  }

  public static fromJSON(data: Record<string, any>): Command {
    throw Command.notImplementedError('fromJSON', data.type);
  }
  //#endregion

  //#region static helpers
  private static notImplementedError(methodName: string, commandName: string): Error {
    return new Error(`${methodName} not implemented for the command "${commandName}".`)
  }
  //#endregion
}

export interface CommandJSON {
  type: CommandType;
  position: Position;
  name: string | undefined;
  stackFrame: IStackFrame | undefined;
}
