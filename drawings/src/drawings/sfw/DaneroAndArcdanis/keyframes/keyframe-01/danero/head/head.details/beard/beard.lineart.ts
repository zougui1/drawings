import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const beardLineart = (drawer: Group) => {
  //#region beard
  drawer
    .path(data.danero.head.beard.fluff).stroke()

    .move(233, 253).absolute()

    .curve(188, 240, 145, 257).absolute()
    .curve(152, 258, 156, 261).absolute()

    .curve(132, 270, 125, 285).absolute()
    .curve(134, 281, 141, 282).absolute()

    .curve(115, 310, 111, 345).absolute()
    .curve(130, 322, 150, 315).absolute()

    .curve(125, 330, 115, 350).absolute()
    .curve(129, 338, 141, 335).absolute()

    .curve(131, 355, 130, 380).absolute()
    .curve(129, 392, 131, 400).absolute()
    .curve(132, 394, 138, 390).absolute()
    .curve(140, 390, 142, 389).absolute()
    .curve(145, 377, 155, 370).absolute()

    .curve(147, 400, 150, 430).absolute()
    .curve(149, 445, 152, 460).absolute()
    .curve(154, 457, 157, 455).absolute()
    .curve(158, 459, 157, 464).absolute()
    .curve(165, 458, 180, 455).absolute()
    .curve(180, 455, 165, 461).absolute()
    .curve(185, 461, 200, 457).absolute()

    .curve(189, 465, 170, 468).absolute()
    .curve(198, 482, 235, 482).absolute()

    .curve(205, 487, 185, 485).absolute()
    .curve(210, 497, 240, 500).absolute()

    .curve(225, 500, 210, 498).absolute()
    .curve(220, 503, 230, 504).absolute()

    .curve(217, 507, 207, 506).absolute()
    .curve(240, 519, 270, 524).absolute()

    .curve(258, 525, 245, 522).absolute()
    .curve(264, 530, 290, 535).absolute()

    .curve(275, 537, 265, 535).absolute()
    .curve(276, 536, 289, 546, 304, 546).absolute()

    .curve(297, 549, 290, 550).absolute()
    .curve(303, 552, 313, 550).absolute()

    .curve(309, 555, 304, 555).absolute()
    .curve(313, 558, 320, 555).absolute()

    .curve(317, 561, 311, 563).absolute()
    .curve(319, 561.5, 328, 569, 337, 568).absolute()

    .curve(335, 569, 325, 569, 317, 566).absolute()
    .curve(334, 572, 342, 596, 356, 596).absolute()

    .curve(354, 606, 355, 614).absolute()
    .curve(360, 609, 365, 609).absolute()

    .curve(365, 616, 368, 625).absolute()
    .curve(368, 621, 370, 619).absolute()

    .curve(373, 628, 375, 630).absolute()
    .curve(374.5, 626, 375.5, 621).absolute()

    .curve(377, 631, 382, 635, 387, 638).absolute()
    .curve(384.8, 630.6).absolute()
  //#endregion
}
