import { Group } from 'drawer'

import { hornRightFill } from './horn-right.fill';
import { hornRightLineart } from './horn-right.lineart';

export const hornRight = (draw: Group) => {
  draw
    .group('horn-right-lineart', hornRightLineart)
    .group('horn-right-fill', hornRightFill)
}
