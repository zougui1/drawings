import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const piercingsMixed = (drawer: Group) => {
  //#region underlips - right piercing
  drawer
    .path(data.danero.head.underlips.piercing.right)

    .move(545, 649)
    .curve(544, 636, 525, 636, 523, 649).absolute()
    .curve(523, 662, 544, 662, 545, 649).absolute()
    .curve(544.983, 648.8).absolute()
  //#endregion

  //#region underlips - left piercing
  drawer
    .path(data.danero.head.underlips.piercing.left)

    .move(565, 661.5)
    .curve(566, 670, 559, 672.4, 550.2, 666.2).absolute()
  //#endregion
}
