import { ArcJSON } from '../Arc';
import { CircleJSON } from '../Circle';
import { CommandJSON } from '../Command';
import { CommandType } from '../commandTypes';
import { PathJSON } from '../../drawing-elements';

export const fixArcsRotation = (path: PathJSON): CommandJSON[] => {
  return path.pathData.map(command => {
    if (command.type === CommandType.arc || command.type === CommandType.circle) {
      const fixedCommand: ArcJSON | CircleJSON = {
        ...(command as ArcJSON | CircleJSON),
        rotation: 0,
      };

      return fixedCommand;
    }

    return command;
  });
}
