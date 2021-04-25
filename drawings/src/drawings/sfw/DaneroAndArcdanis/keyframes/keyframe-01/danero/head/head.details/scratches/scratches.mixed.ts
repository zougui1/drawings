import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const scratchesMixed = (drawer: Group) => {
  drawer
    .path(data.danero.head.snout.scratch)

    .move(585, 328)
    .curve(573, 344, 559, 353, 548, 363).absolute()
    .curve(562, 358, 577, 352, 597.6, 348).absolute()
}
