import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const earsMixed = (drawer: Group) => {
  drawer
    .path(data.danero.head.ear.inner)

    // ears - inner
    //.move(319, 175)
    //.curve(312.8, 87, 404, -130, 451, -250).absolute()
    .move(306, 175)
    .curve(297, 89, 404, -130, 451, -250).absolute()
    .curve(466, -284, 435, -255).absolute()
    .curve(280, -100, 195, 134, 275, 174).absolute()
}
