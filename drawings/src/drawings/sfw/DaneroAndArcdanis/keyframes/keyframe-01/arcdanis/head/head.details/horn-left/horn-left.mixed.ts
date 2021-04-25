import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const hornLeftMixed = (drawer: Group) => {
  drawer
    .path(data.arcdanis.head.horn.left).stroke()

    // top
    .move(970, 115).absolute()
    // 1st ridge
    .curve(10, -30)
    // base
    .curve(310, -147)
    // last ridge
    .curve(110, -3)
    // horn-blade
    .curve(190, -170)

    // bottom
    .move(970, 115).absolute()
    .curve(18, 5)
    // 1st ridge
    .curve(335, -80)
    // last ridge
    .curve(103, 2)
    // horn-blade
    .curve(164, -277)


  //#region progressive line test
  //const length = 100;
  const length = 0;

  for (let i = 0; i < length; i++) {
    drawer
      .path(data.arcdanis.head.horn.left).stroke()
      .name('progressive line test ' + i)
      .strokeWidth(1 - i / 150)

    // progressive stroke test
      .move(1000 + i - (0.01 * i), 150 + i - (0.01 * i)).absolute()
      .curve(1, 1)
  }
  //#endregion
}
