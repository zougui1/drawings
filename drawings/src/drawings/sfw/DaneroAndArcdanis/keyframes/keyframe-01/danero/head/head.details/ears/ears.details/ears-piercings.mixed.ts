import { Group } from 'drawer';

import { data } from '../../../../../../../data';

export const earsPiercingsDetailsMixed = (drawer: Group) => {

  //#region ear - bottom circle piercing; stroke & fill
  drawer
    .path(data.danero.head.ear.piercing.circles.bottom)

    .move(253, 186)
    .circle(10, 13).rotation(25).absolute()
  //#endregion

  //#region ear - top circle piercing; stroke & fill
  drawer
    .path(data.danero.head.ear.piercing.circles.top)

    .move(240, 158)
    .circle(7, 9).rotation(35).absolute()
  //#endregion

  //#region ear - bottom ring piercing; stroke & fill
  const x1 = 13;
  drawer
    .path(data.danero.head.ear.piercing.rings.bottom)

    .move(355 - x1, 119).absolute()
    .curve(349 - x1, 124, 345 - x1, 125).absolute()
    .curve(330 - x1, 127, 318 - x1, 122).absolute()
    .curve(318 - x1, 116, 319 - x1, 112, 326 - x1, 107).absolute()
    .curve(327 - x1, 115).absolute()
    .curve(338 - x1, 117.4, 343 - x1, 116).absolute()
    .curve(355 - x1, 113).absolute()
    .curve(355.5 - x1, 116, 354.85 - x1, 119.2).absolute()
    .curve(354.4 - x1, 119.5).absolute()
  //#endregion

  //#region ear - middle ring piercing; stroke & fill
  const x2 = 11;
  drawer
    .path(data.danero.head.ear.piercing.rings.middle)

    .move(358 - x2, 90).absolute()
    .curve(355 - x2, 94, 350 - x2, 96).absolute()
    .curve(344 - x2, 98, 328 - x2, 95, 322 - x2, 92).absolute()
    .curve(322 - x2, 88, 326 - x2, 80, 332.5 - x2, 77).absolute()
    .curve(332.4 - x2, 86).absolute()
    .curve(339 - x2, 88.5, 345 - x2, 88).absolute()
    .curve(348 - x2, 88, 358 - x2, 85).absolute()
    .curve(359 - x2, 87, 358 - x2, 90).absolute()
    .curve(357.69 - x2, 90.4).absolute()
  //#endregion

  //#region ear - top ring piercing; stroke & fill
  const x3 = 10;
  drawer
    .path(data.danero.head.ear.piercing.rings.top)

    .move(365 - x3, 62).absolute()
    .curve(360 - x3, 67, 356 - x3, 68).absolute()
    .curve(347 - x3, 69, 334 - x3, 66, 329 - x3, 63).absolute()
    .curve(330 - x3, 59, 332 - x3, 54, 339.8 - x3, 50).absolute()
    .curve(339 - x3, 58).absolute()
    .curve(346 - x3, 61, 353 - x3, 60.6).absolute()
    .curve(360 - x3, 60, 364 - x3, 58).absolute()
    .curve(365 - x3, 60, 365 - x3, 62).absolute()
    .curve(364.595 - x3, 62.4).absolute()
  //#endregion

  //#region ear - bottom bar piercing; stroke & fill
  drawer
    .path(data.danero.head.ear.piercing.bars.bottom.outerBar)

    .move(448, -146).absolute()
    .curve(423, -154).absolute()
    .curve(422, -160, 427, -164).absolute()
    .curve(451, -156).absolute()

  drawer
    .path(data.danero.head.ear.piercing.bars.bottom.circle)

    .move(471, -147)
    .circle(12, 10).rotation(20).absolute()

  drawer
    .path(data.danero.head.ear.piercing.bars.bottom.innerBar)

    .move(414, -156.88).absolute()
    .curve(400, -161.5).absolute()
    .curve(399, -168, 404, -171.6).absolute()
    .curve(418, -167).absolute()
  //#endregion

  //#region ear - top bar piercing; stroke & fill
  drawer
    .path(data.danero.head.ear.piercing.bars.top.outerBar)

    .move(457, -172).absolute()
    .curve(433.7, -179).absolute()
    .curve(433, -185, 437, -188).absolute()
    .curve(459.3, -181.5).absolute()

  drawer
    .path(data.danero.head.ear.piercing.bars.top.circle)

    .move(480, -173.5)
    .circle(12, 10).rotation(20).absolute()

  drawer
    .path(data.danero.head.ear.piercing.bars.top.innerBar)

    .move(424, -181.86).absolute()
    .curve(412, -185.49).absolute()
    .curve(411.6, -191, 415, -194.36).absolute()
    .curve(427.3, -190.8).absolute()
  //#endregion
}
