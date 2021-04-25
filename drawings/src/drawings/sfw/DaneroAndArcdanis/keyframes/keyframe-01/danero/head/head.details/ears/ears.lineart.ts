import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const earsLineart = (drawer: Group) => {
  drawer
    .path(data.danero.head.ear.outer).stroke()

    //? ear global shape
    // ear right
    // ear outer line
    .move(225, 240)
    .curve(145, 30, 380, -230, 450, -280).absolute()
    // tip rounding
    .curve(480, -300, 465, -260).absolute()
    // ear outer line
    .curve(375, -10, 435, 100, 355, 200).absolute()
}
