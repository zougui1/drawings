import { Group } from 'drawer';

import { data } from '../../../../data';

export const headFill = (drawer: Group) => {
  drawer
    .path(data.danero.head.shape).fill()

    // neck back
    .move(-400, 800)
    .curve(-250, 730, -280, 550, -175, 320).absolute()
    .curve(-100, 170, -10, 35, 150, -3).absolute()
    // head back/top
    .curve(400, -70, 550, 80, 590, 200).absolute()
    // head top
    .curve(622, 290).absolute()
    // forehead
    .curve(620, 305, 585, 328).absolute()
    // snout top
    .curve(620, 380, 652, 450, 700, 580).absolute()
    // nose-chin
    .curve(610, 660, 530, 673, 495, 678).absolute()
    // chin-jaw
    .curve(450, 610, 320, 496).absolute()
    // smooth connection
    .curve(310, 487, 295, 475, 270, 474).absolute()
    // neck front
    .curve(191, 475, 198, 540, 202, 700).absolute()
    .curve(204, 795, 225, 910, 205, 1020).absolute()
    .curve(-500, 1020).absolute()
}
