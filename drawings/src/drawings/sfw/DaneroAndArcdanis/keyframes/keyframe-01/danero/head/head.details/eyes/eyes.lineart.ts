import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const eyesLineart = (drawer: Group) => {
  drawer
    .path(data.danero.head.eye.top).stroke()

    .move(511, 284)
    .curve(495, 273, 470, 263, 450, 260).absolute()

  drawer
    .path(data.danero.head.eye['top/left']).stroke()

    .move(457, 261.5)
    .curve(453, 263, 450.8, 265).absolute()

  drawer
    .path(data.danero.head.eye['left/bottom']).stroke()

    .move(450.1, 266)
    .curve(452, 312, 485, 318, 502.8, 320.6).absolute()

  drawer
    .path(data.danero.head.eye.right).stroke()

    .move(509, 282.8)
    .curve(509.5, 298, 513, 314, 504, 321).absolute()

  drawer
    .path(data.danero.head.eye.eyebrow).stroke()

    .move(465, 200)
    .curve(510, 210, 530, 225).absolute()
}
