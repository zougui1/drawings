import { Group } from 'drawer';

import { data } from '../../../../../../../../data';

export const ringMixed = (drawer: Group) => {
  //#region nose ring
  drawer
    .path(data.danero.head.nose.ring)

    // inner
    .move(616.6, 534.4)
    .curve(608, 542, 599.5, 552).absolute()
    .curve(598, 554, 597.2, 554, 597, 558).absolute()
    .curve(604, 625, 603, 651, 606.5, 671).absolute()
    .curve(607.3, 673.4, 609, 671).absolute()
    .curve(610, 669.5, 612, 669, 619, 658).absolute()
    .curve(620, 656, 620, 653).absolute()
    .curve(619.3, 645, 619, 637.5).absolute()
    // inner-outer connection
    .curve(628, 632.5).absolute()
    // outer
    .curve(629.4, 650, 629, 655).absolute()
    .curve(628, 663, 625, 669).absolute()
    .curve(619, 683, 610, 698, 599, 710).absolute()
    .curve(596.5, 712, 595.2, 707).absolute()
    .curve(585, 665, 583.7, 610, 582, 550).absolute()
    .curve(582, 548, 585, 545).absolute()
    .curve(600, 530, 608, 522).absolute()
  //#endregion
}
