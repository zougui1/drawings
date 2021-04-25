import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const noseLineart = (drawer: Group) => {
  drawer
    .path(data.danero.head.nose.nostrils)

    .move(620, 540)
    .curve(595, 498, 600, 537.5).absolute()
    .move(625, 531.5).absolute()
    .curve(590, 478, 591, 529).absolute()
}
