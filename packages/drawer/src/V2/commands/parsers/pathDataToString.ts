import { arcToString } from './arcToString';
import { circleToString } from './circleToString';
import { closeToString } from './closeToString';
import { curveToString } from './curveToString';
import { lineToString } from './lineToString';
import { moveToString } from './moveToString';
import { rectToString } from './rectToString';
import { CommandJSON } from '../Command';
import { CommandType } from '../commandTypes';

export const pathDataToString = (commands: CommandData[]): string => {
  const commandsStr = commands.map((command) => {
    switch (command.type) {
      case CommandType.move:
        return moveToString(command  as any);
      case CommandType.line:
        return lineToString(command as any);
      case CommandType.curve:
        return curveToString(command as any);
      case CommandType.arc:
        return arcToString(command as any);
      case CommandType.close:
        return closeToString();
      case CommandType.circle:
        return circleToString(command as any);
      case CommandType.rect:
        return rectToString(command as any);

      default:
        throw new Error(`No command of type "${command.type}"`);
    }
  });

  return commandsStr.join('\n');
}

type CommandData = Pick<CommandJSON, 'type'>;
