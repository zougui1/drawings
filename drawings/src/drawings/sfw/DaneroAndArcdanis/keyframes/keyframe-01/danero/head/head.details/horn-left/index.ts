import { Group } from 'drawer'

import { hornLeftFill } from './horn-left.fill';
import { hornLeftLineart } from './horn-left.lineart';

export const hornLeft = (draw: Group) => {
  draw
    .group('horn-left-lineart', hornLeftLineart)
    .group('horn-left-fill', hornLeftFill)
}
