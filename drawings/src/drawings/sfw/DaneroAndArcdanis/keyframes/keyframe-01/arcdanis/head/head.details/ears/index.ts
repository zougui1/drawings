import { Group } from 'drawer'

import { earsLineart } from './ears.lineart';

export const ears = (draw: Group) => {
  draw
    .group('ears-lineart', earsLineart)
}
