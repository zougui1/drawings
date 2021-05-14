import { getDrawnDataNames } from '../getDrawnDataNames';
import { Group, Path } from '../../elements';
import { Command } from '../../commands';
import { FlatDrawingData } from '../../types';

export const checkGroupDrawsEverything = (group: Group, data: FlatDrawingData[]): void => {
  const drawnNames = getDrawnDataNames(group);
  const undrawnData = data.filter(({ name }) => !drawnNames.includes(name));

  if (undrawnData.length) {
    const undrawnNames = undrawnData.map(data => `${data.path ?? 'ROOT'}: "${data.name}"`);
    console.warn('All the elements must be drawn at the first frame. The following elements were not drawn:', ['', ...undrawnNames].join('\n  '));
  }
}

const checkCommandType = (origin: Command, current: Command | undefined): void => {
  if (origin.commandType !== current?.commandType) {
    throw new Error(`Invalid command, expected "${origin.commandType}". Got "${current?.commandType}"`);
  }
}

const checkPathLength = (originCommands: Command[], currentCommands: Command[]): void => {
  if (originCommands.length > currentCommands.length) {
    const missingCommands = originCommands.slice(currentCommands.length);
    const missingCommandTypes = missingCommands.map(com => com.commandType);

    throw new Error(`${missingCommands.length} commands are missing:\n  ${missingCommandTypes.join('\n  ')}`);
  } else if (currentCommands.length > originCommands.length) {
    const overflowingCommands = currentCommands.slice(originCommands.length);
    const overflowingCommandTypes = overflowingCommands.map(com => com.commandType);

    throw new Error(`There is ${overflowingCommands.length} too many commands:\n  ${overflowingCommandTypes.join('\n  ')}`);
  }
}

export const checkKeyframeShape = (origin: Group, current: Group): void => {
  origin.elements.forEach(originElement => {
    const currentElement = current.elements.find(current => current.getName() === originElement.getName());

    if (!currentElement) {
      return;
    }

    if (currentElement instanceof Group && originElement instanceof Group) {
      checkKeyframeShape(originElement, currentElement);
    } else if (currentElement instanceof Path && originElement instanceof Path) {
      const originCommands = originElement.pathData.commands;
      const currentCommands = currentElement.pathData.commands;

      checkPathLength(originCommands, currentCommands);

      originCommands.forEach((originCommand, i) => {
        checkCommandType(originCommand, currentCommands[i]);
      });
    } else {
      throw new Error(`Invalid element type for "${originElement.getName()}". Got "${currentElement?.constructor.name}" instead of "${originElement.constructor.name}".`);
    }
  });
}
