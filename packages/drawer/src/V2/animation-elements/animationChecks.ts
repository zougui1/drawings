import _ from 'lodash';

import { Group, Path } from '../drawing-elements';
import { Command, InvalidCommand } from '../commands';
import { FlatDrawingData } from '../types';
import { getNth } from '../utils';
import {
  AnimationKeyframeMissingCommandsError, getMissingCommandsDetails,
  AnimationKeyframeTooManyCommandsError, getTooManyCommandsDetails,
  AnimationKeyframeInvalidCommandsError, getInvalidCommandsDetails,
  AnimationKeyframeUnexpectedElementError, getUnexpectedElementDetails,
} from './animation-errors';

export const checkGroupDrawsEverything = (group: Group, data: FlatDrawingData[]): void => {
  const drawnNames = group.getPaths().map(path => path.getName());
  const undrawnData = data.filter(({ name }) => !drawnNames.includes(name));

  if (undrawnData.length) {
    const undrawnNames = undrawnData.map(data => `${data.path ?? 'ROOT'}: "${data.name}"`);
    console.warn('All the elements must be drawn at the first frame. The following elements were not drawn:', ['', ...undrawnNames].join('\n  '));
  }
}

export const checkKeyframeShape = (origin: Group, current: Group, keyframe: { time: number, nth: number }): void => {
  const originPaths = origin.getPaths();
  const currentPaths = current.getPaths();

  for (const currentPath of currentPaths) {
    const currentName = currentPath.buildNeutralName();
    const currentFullName = currentPath.buildName();
    const keyframeLabel = `"${currentFullName}" of the ${getNth(keyframe.nth)} keyframe at ${keyframe.time} second`;
    const currentLocation = currentPath.getFileLocation();

    const originPath = originPaths.find(path => path.buildNeutralName() === currentName);

    if (!originPath) {
      const details = getUnexpectedElementDetails(currentPath);

      throw new AnimationKeyframeUnexpectedElementError({
        label: currentPath.getNamespace(),
        name: currentPath.getName(),
        location: currentLocation,
      }, details);
    }

    const originCommands = originPath.pathData.commands;
    const currentCommands = currentPath.pathData.commands;

    checkPathLength(keyframeLabel, {
      path: originPath,
      commands: originCommands,
    }, {
      path: currentPath,
      commands: currentCommands,
    });

    const invalidCommands = originCommands.map((originCommand, i) => {
      if (!isValidCommandType(originCommand, currentCommands[i])) {
        return {
          received: currentCommands[i],
          expected: originCommand.commandType,
        };
      }
    });

    const invalidCommandsData = invalidCommands.filter(com => com) as InvalidCommand[];

    if (invalidCommandsData.length) {
      const { invalidCommandList, details } = getInvalidCommandsDetails(currentPath, currentCommands, invalidCommandsData);

      throw new AnimationKeyframeInvalidCommandsError({
        label: keyframeLabel,
        commands: `\n  ${invalidCommandList.join('\n  ')}`,
      }, details);
    }
  }
}

const checkPathLength = (label: string, origin: { path: Path, commands: Command[] }, current: { path: Path, commands: Command[] }): void => {
  if (origin.commands.length > current.commands.length) {
    const missingCommands = origin.commands.slice(current.commands.length);
    const { details, missingCommandList } = getMissingCommandsDetails(current.path, current.commands, missingCommands);

    throw new AnimationKeyframeMissingCommandsError({
      label,
      count: missingCommands.length,
      commands: `\n  ${missingCommandList.join('\n  ')}`,
    }, details);
  } else if (current.commands.length > origin.commands.length) {
    const tooManyCommands = current.commands.slice(origin.commands.length);
    const expectedCommands = current.commands.slice(0, -tooManyCommands.length);

    const { details, tooManyCommandList } = getTooManyCommandsDetails(current.path, expectedCommands, tooManyCommands);

    throw new AnimationKeyframeTooManyCommandsError({
      label,
      count: tooManyCommands.length,
      commands: `\n  ${tooManyCommandList.join('\n  ')}`,
    }, details);
  }
}

const isValidCommandType = (origin: Command, current: Command | undefined): boolean => {
  return origin.commandType === current?.commandType;
}
