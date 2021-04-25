import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const eyesFill = (drawer: Group) => {
  drawer
    .path(data.danero.head.eye.chamber['1']).fill()

    // top
    .move(457, 261.5)
    // intersection top-left
    .curve(453, 263, 450.8, 265).absolute()
    // left/bottom
    .curve(452, 312, 486, 318, 504, 320.6).absolute()
    // right
    .curve(509, 282.8).absolute()
    .curve(509, 298, 513, 314, 504, 320.6).absolute()
    // top
    .curve(504.5, 317, 507, 305, 507, 282).absolute()
    .curve(495, 273, 470, 263, 450, 260).absolute()

  drawer
    .path(data.danero.head.eye.chamber['2']).fill()

    .move(0, 0)
    .rect(504, 320.6, 1, -5).absolute()
    .rect(504, 317, 3, -25).absolute()

  drawer
    .path(data.danero.head.eye.iris).fill()

    .move(489, 272)
    .curve(480, 315, 495, 320, 510, 312).absolute()
    .curve(509, 282.5).absolute()

  drawer
    .path(data.danero.head.eye.pupil).fill()

    .move(507, 281)
    .curve(494, 295, 505, 310, 510, 300).absolute()
    .curve(509, 282.5).absolute()
}
