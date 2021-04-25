import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const tongueMixed = (drawer: Group) => {
  drawer
    .path(data.arcdanis.head.tongue)

    // top
    .move(1038, 386.3).absolute()
    .curve(-80, 10, -215, 30, -275, 54).offset(12, -10)
    // outer curve
    .curve(-48, 10, -85, 50, -90, 63).offset(-7, 9)
    // tip
    .curve(-30, -40, -15, -10, 28, -50).offset(10, 87)
    // inner curve
    .curve(14, -60, 20, -69, 31, -77).offset(0, 47)
    .curve(5, -17, 24, -34, 40, -41).offset(3, 11)
    // bottom
    .curve(45, -56, 120, -72, 192.9, -80).offset(-28, 44)
}
