import { Position } from '../commands';

const rePathSeparation = /[ ,\n]+/g;

export const parseSegment = (segment: string): [Position, ...number[]] => {
  const [command, ...numberStrings] = segment
    .replace(rePathSeparation, ' ')
    .split(' ');
  const position = command.toUpperCase() === command
    ? Position.absolute
    : Position.relative;
  const numbers = numberStrings.map(num => Number(num));


  return [position, ...numbers];
}
