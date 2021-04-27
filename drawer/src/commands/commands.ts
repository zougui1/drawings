import { Command } from './Command';
import { Arc } from './Arc';
import { Circle } from './Circle';
import { Close } from './Close';
import { Curve } from './Curve';
import { Line } from './Line';
import { Move } from './Move';
import { Rect } from './Rect';

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
  relative: [Command],
  setX: [Line, Arc],
  setY: [Line, Arc],
  radius: [Arc, Circle],
  rotation: [Arc, Circle],
  sweep: [Arc],
  large: [Arc],
  offsetY: [Curve],
  offsetX: [Curve],
  offset: [Curve],
  catmullRom: [Curve],
};
