import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const whiskersLineart = (drawer: Group) => {
  //#region right whisker
  drawer
    .path(data.danero.head.whisker.right.noodle).stroke()

    // whisker - right
    .move(590, 498)
    .curve(538, 590, 537, 800, 540, 952).absolute()
  //#endregion

  //#region left whisker
  drawer
    .path(data.danero.head.whisker.left.noodle).stroke()

    // whisker left
    .move(579, 656.3)
    .curve(570, 750, 571, 850, 573, 937).absolute()
    //#endregion
}
