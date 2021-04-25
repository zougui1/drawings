import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const earsLineart = (drawer: Group) => {
  drawer
    .path(data.arcdanis.head.ear.shape.inner).stroke()

    //? ear inner shape
    // top
    .move(1260, 96).absolute()
    .curve(1280, 98, 1295, 65, 1353, 80).absolute()
    .curve(1383, 91, 1463, 85).absolute()
    // round tip
    .curve(1470, 85.2, 1463, 89).absolute()
    // bottom
    .curve(1360, 138, 1300, 169, 1257, 145).absolute()

  drawer
    .path(data.arcdanis.head.ear.shape.outer).stroke()

    //? ear outer shape
    // top
    .move(1265, 110).absolute()
    .curve(1315, 80, 1345, 95, 1435, 90).absolute()
    // round tip
    .curve(1448, 89.5, 1446, 92, 1435, 98).absolute()
    // bottom
    .curve(1404, 115, 1284, 156, 1264, 137).absolute()
}
