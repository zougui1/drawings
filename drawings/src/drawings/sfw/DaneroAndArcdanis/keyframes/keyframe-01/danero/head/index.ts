import { Group } from 'drawer'

import { headDetails } from './head.details';
import { headFill } from './head.fill';
import { headLineart } from './head.lineart';

export const head = (drawer: Group) => {
  drawer
    .group('head-lineart', headLineart)
    .group('head-fill', headFill)
    .group('head-details', headDetails)
}
