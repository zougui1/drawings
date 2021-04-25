import { Group } from 'drawer'

import { eyesFill } from './eyes.fill';
import { eyesLineart } from './eyes.lineart';

export const eyes = (draw: Group) => {
  draw
    .group('eyes-lineart', eyesLineart)
    .group('eyes-fill', eyesFill)
}
