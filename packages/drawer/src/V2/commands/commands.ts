import { CommandType } from './commandTypes';
import { Command } from './Command';
import { Arc } from './Arc';
import { Circle } from './Circle';
import { Curve } from './Curve';

export const labelToType: Record<string, string> = {
  m: 'Move',
  M: 'Move',
  z: 'Close',
  Z: 'Close',
  c: 'Bezier Curve',
  C: 'Bezier Curve',
  q: 'Quadratic Curve',
  Q: 'Quadratic Curve',
  l: 'Line',
  L: 'Line',
  h: 'Horizontal Line',
  H: 'Horizontal Line',
  v: 'Vertical Line',
  V: 'Vertical Line',
  a: 'Arc',
  A: 'Arc',
};

export const exposedMethods = {
  absolute: [Command],
  name: [Command],
  radius: [Arc, Circle],
  rotation: [Arc, Circle],
  sweep: [Arc],
  large: [Arc],
  offset: [Curve],
};

export const checkCommandMethod = <T extends typeof Command>(command: any, methodName: string, commands: T[]): command is InstanceType<T> => {
  if (!command) {
    throw new Error('The command is undefined.');
  }

  if (commands.some(constraint => command instanceof constraint)) {
    return true;
  }

  const commandNames = formatCommandNames(commands);
  throw new Error(`The method "${methodName}" can only be used on ${commandNames} commands.`);
}

const formatCommandNames = (commands: (typeof Command)[]): string => {
  let commandsName = commands.length === 1
    ? commands[0].name
    : commands.slice(0, -1).map(c => c.name).join(', ');

  if (commands.length > 1) {
    commandsName += ` and ${commands[commands.length - 1].name}`;
  }

  return commandsName;
}
