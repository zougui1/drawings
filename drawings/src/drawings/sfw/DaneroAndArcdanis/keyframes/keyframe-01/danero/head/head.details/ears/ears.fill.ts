import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const earsFill = (drawer: Group) => {
  drawer
    .path(data.danero.head.ear.outer).fill()

    // front ear
    // ear transparency filling
    // ear outer lines
    .move(225, 260 - 20)
    .curve(145, 50 - 20, 380, -210 - 20, 450, -260 - 20).absolute()
    // tip rounding
    .curve(480, -280 - 20, 465, -240 - 20).absolute()
    // ear outer line
    .curve(375, 10 - 20, 435, 120 - 20, 355, 220 - 20).absolute()
}
