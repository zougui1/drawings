import { Group } from 'drawer';

import { data } from '../../../../../../../../data';

export const ringMixed = (drawer: Group) => {
  //#region ring
  drawer
    .path(data.danero.head.beard.ring)

    // ring - top
    .move(425, 856.5).absolute()
    .curve(440, 863.2, 460, 870, 470, 856).absolute()
    // ring - right
    .curve(473, 865, 472.5, 870).absolute()
    .curve(472, 873.5, 466.5, 877.3).absolute()
    // ring - bottom
    .curve(461, 881, 445, 881, 435, 877.4).absolute()
    .curve(427.4, 875, 425.5, 870).absolute()
    // ring - left
    .curve(424, 865, 425, 856.5).absolute()
  //#endregion
}
