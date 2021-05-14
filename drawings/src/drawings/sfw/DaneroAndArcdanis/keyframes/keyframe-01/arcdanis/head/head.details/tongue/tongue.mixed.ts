import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const tongueMixed = (drawer: Group) => {
  drawer
    .path(data.arcdanis.head.tongue)

    // top
    .move(1038, 386.3).absolute().name('some')
    .curve(-80, 10, -215, 30, -275, 64).offset(12, -10)
    // outer curve
    .curve(-48, 30, -85, 100, -80, 150).offset(-7, -1)
    // tip
    .curve(0.5, 32, 19, 26, 28, -3)
    // inner curve
    .curve(14, -40, 20, -52, 31, -66)
    .curve(5, -13, 24, -24, 40, -33).offset(3)
    // bottom
    .curve(45, -46, 120, -72, 192.9, -80).offset(-28, 36)
}
