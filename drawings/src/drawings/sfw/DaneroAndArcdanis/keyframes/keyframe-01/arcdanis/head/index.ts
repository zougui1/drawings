import { Group } from 'drawer'

import { headLineart } from './head.lineart';
import { headDetails } from './head.details';

export const head = (draw: Group) => {
  draw
    .group('head-lineart', headLineart)
    .group('head-details', headDetails)
}
