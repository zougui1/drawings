import { Group } from 'drawer';

import { data } from '../../../../data';

export const headLineart = (drawer: Group) => {
  drawer
    .path(data.arcdanis.head.shape).stroke()

    // nose
    .move(700, 300).absolute()
    .curve(685, 250, 690, 160, 700, 136).absolute()
    // snout top
    .curve(850, 120, 900, 110, 980, 110).absolute()
    // forehead
    .curve(981, 90, 993, 68).absolute()
    // head top
    .curve(1100, -25, 1390, -60, 1510, 40).absolute()
    // neck back
    .curve(1775, 230, 1780, 700, 1845, 780).absolute()
    .curve(1870, 817, 1905, 830).absolute()
    // jaw top
    .move(700, 300).absolute()
    .curve(840, 310, 1010, 300, 1120, 290).absolute()
    // jaw bottom
    .curve(1080, 380, 940, 460, 760, 545).absolute()
    // chin front
    .curve(785, 580, 800, 595).absolute()
    // chin bottom
    .curve(900, 533, 1050, 487, 1130, 440).absolute()
    // neck front
    .curve(1250, 580, 1250, 920, 1250, 1020).absolute()
}
