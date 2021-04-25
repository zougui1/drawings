import { Group } from 'drawer'

import { whiskersLineart } from './whiskers.lineart';
import { whiskersMixed } from './whiskers.mixed';

export const whiskers = (drawer: Group) => {
  drawer
    .group('whiskers-lineart', whiskersLineart)
    .group('whiskers-mixed', whiskersMixed)
}
