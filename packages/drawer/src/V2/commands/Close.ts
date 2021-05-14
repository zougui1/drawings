import { Command, CommandJSON } from './Command';
import { CommandType } from './commandTypes';

const closePlaceholder = 'close()';
export class Close extends Command {
  public static readonly command: string = 'z';

  public readonly commandType: CommandType.close = CommandType.close;
  public readonly placeholder: string = closePlaceholder;

  //#region public API
  public get x(): undefined {
    return undefined;
  }

  public get y(): undefined {
    return undefined;
  }

  public static getCommandPlaceholder(): string {
    return closePlaceholder;
  }
  //#endregion

  //#region parsing
  public toString(): string {
    return Close.command;
  }

  public static fromString(segment: string): Close {
    return new Close();
  }

  public toJSON(): CloseJSON {
    return {
      type: CommandType.close,
      name: this._name,
      stackFrame: this._stackFrame,
      position: this._position,
    };
  }
  //#endregion
}

export interface CloseJSON extends CommandJSON {
  type: CommandType.close;
}
