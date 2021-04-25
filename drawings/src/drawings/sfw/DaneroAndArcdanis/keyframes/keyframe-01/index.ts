import { Group } from 'drawer';

import { arcdanis } from './arcdanis';
import { danero } from './danero';

export const keyframe01 = (drawer: Group) => {
  drawer
    .group('arcdanis', arcdanis)
    .group('danero', danero);
}
