import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const tongueMixed = (drawer: Group) => {
  drawer
    .path(data.arcdanis.head.tongue).stroke()

    // top
    .move(1038, 386.3).absolute()
    .curve(-80, 10, -215, 30, -275, 54).offset(12, -10)
    // outer curve
    .curve(-48, 10, -85, 50, -90, 60).offset(-7, 9)
    // tip
    .curve(-130, -52, 0, -16, 28, -53).offset(10, 90)
    // inner curve
    .curve(14, -60, 20, -72, 31, -76).offset(0, 50)
    .curve(5, -13, 24, -34, 40, -38).offset(3, 10)
    // bottom
    .curve(45, -56, 120, -72, 192.9, -80).offset(-28, 41)
}
