import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const hornRightFill = (drawer: Group) => {
  //#region 1st ridge
  drawer
    .path(data.danero.head.horn.right['1']).fill()

    // right
    .move(516, 81.46)
    .curve(510, 47, 474, 7, 470, -20).absolute()
    // top
    .curve(412, -36, 352, -35, 254, -26.6).absolute()
    // left
    .curve(411, 6, 413, 9, 415, 11).absolute()
    .curve(415, 11, 416, 12, 417, 12).absolute()
    .curve(418, 12, 419, 13, 420, 13).absolute()
    .curve(424, 15, 431, 19, 435, 21).absolute()
    .curve(444, 26, 458, 36, 458, 42).absolute()
    .curve(476, 49, 484, 60, 492, 59).absolute()
  //#endregion

  //#region 2nd ridge
  drawer
    .path(data.danero.head.horn.right['2']).fill()

    // right
    .move(463, -22.15)
    .curve(454, -70, 417, -100, 413, -152).absolute()
    // top
    .curve(405, -152, 400, -153, 390, -150).absolute()
    .curve(369, -144, 370, -141, 350, -135).absolute()
    .curve(335, -130, 334, -135, 320, -128).absolute()
    .curve(303, -120, 306, -115, 290, -105).absolute()
    .curve(276, -96, 276, -95, 260, -90).absolute()
    .curve(249, -87, 243, -88, 237, -90).absolute()
    // left
      .curve(264, -50, 260, -27).absolute()
  //#endregion

  //#region 3rd ridge
  drawer
    .path(data.danero.head.horn.right['3']).fill()

    // right
    .move(407, -152)
    .curve(387, -190, 340, -212, 336, -262).absolute()
    // top
    .curve(331, -262, 327, -263, 320, -258).absolute()
    .curve(303, -247, 307, -243, 290, -232).absolute()
    .curve(276, -223, 272, -230, 260, -220).absolute()
    .curve(244, -206, 250, -201, 235, -186).absolute()
    .curve(225, -176, 223, -178, 210, -171).absolute()
    .curve(200, -166, 195, -165, 190, -163).absolute()
    // left
    .curve(190, -147, 232, -140, 244, -88.8).absolute()
    .curve(260, -88).absolute()
  //#endregion

  //#region 4th ridge
  drawer
    .path(data.danero.head.horn.right['4']).fill()

    // right
    .move(328.3, -261.5)
    .curve(305, -293, 253, -292, 244, -333).absolute()
    // top
    .curve(231, -330, 227, -330, 222, -325).absolute()
    .curve(210, -312, 214, -309, 202, -296).absolute()
    .curve(193, -286, 189, -291, 180, -280).absolute()
    .curve(168, -265, 173, -262, 162, -247).absolute()
    .curve(153, -233, 151, -234, 140, -222).absolute()
    .curve(136, -217, 133, -214, 131, -212).absolute()
    // left
    .curve(130, -195, 180, -191, 196, -165).absolute()
    .curve(197, -155).absolute()
  //#endregion

  //#region 5th ridge
  drawer
    .path(data.danero.head.horn.right['5']).fill()

    // right
    .move(236, -331.2)
    .curve(200, -352, 160, -345, 136, -379).absolute()
    // top
    .curve(119, -366, 123, -357, 117, -342).absolute()
    .curve(110, -323, 102, -328, 90, -312).absolute()
    .curve(80, -298, 84, -295, 73, -282).absolute()
    .curve(64, -272, 60, -276, 50, -267).absolute()
    .curve(46, -263, 45, -260, 45, -257).absolute()
    // left
    .curve(67, -235, 100, -241, 134, -216).absolute()
    .curve(140, -216).absolute()
  //#endregion

  //#region 6th ridge
  drawer
    .path(data.danero.head.horn.right['6']).fill()

    // right
    .move(129, -373)
    .curve(110, -385, 80, -373, 58, -415).absolute()
    // top
    .curve(43, -398, 46, -391, 40, -380).absolute()
    .curve(31, -364, 25, -369, 13, -355).absolute()
    .curve(3, -344, 7, -340, -4, -330).absolute()
    .curve(-17, -317, -21, -322, -35, -310).absolute()
    .curve(-37, -308, -36, -307, -35, -305).absolute()
    // left
    .curve(-10, -280, 25, -285, 46, -262).absolute()
    .curve(85, -260).absolute()
  //#endregion

  //#region 7th ridge
  drawer
    .path(data.danero.head.horn.right['7']).fill()

    // right
    .move(54.5, -411)
    .curve(35, -428, 13, -425, 4, -450).absolute()
    // top
    .curve(-17, -434, -14, -427, -20, -418).absolute()
    .curve(-28, -405, -33, -410, -45, -401).absolute()
    .curve(-54, -394, -52, -391, -62, -385).absolute()
    .curve(-72, -378, -74, -382, -85, -376).absolute()
    .curve(-92, -372, -94, -369, -97, -366).absolute()
    // left
    .curve(-80, -333, -38, -329, -32, -312).absolute()
    .curve(20, -312).absolute()
  //#endregion

  //#region 8th ridge
  drawer
    .path(data.danero.head.horn.right['8']).fill()

    // right
    .move(-0.5, -446)
    .curve(-10, -461, -28, -460, -31, -485).absolute()
    // top
    .curve(-42, -479, -45, -473, -56, -465).absolute()
    .curve(-65, -459, -66, -462, -76, -458).absolute()
    .curve(-89, -453, -88, -450, -101, -447).absolute()
    .curve(-116, -444, -116, -448, -131, -445).absolute()
    .curve(-137, -444, -138, -441, -140, -438).absolute()
    // left
    .curve(-139.5, -413, -95, -390, -94, -369.3).absolute()
    .curve(-60, -352).absolute()
   //#endregion

  //#region 9th ridge
  drawer
    .path(data.danero.head.horn.right['9']).fill()

    // right
    .move(-36.6, -481.5)
    .curve(-39, -491, -49, -495, -46, -522).absolute()
    // top
    .curve(-61, -519, -66, -518, -75, -517).absolute()
    .curve(-88, -517, -87, -521, -100, -520).absolute()
    .curve(-113, -520, -112, -517, -125, -516).absolute()
    .curve(-134, -516, -133, -518, -142, -518).absolute()
    .curve(-147, -519, -149, -519, -152, -518).absolute()
    // left
    .curve(-153, -495, -133, -475, -135.5, -443).absolute()
    .curve(-100, -402).absolute()
  //#endregion

  //#region 10th ridge
  drawer
    .path(data.danero.head.horn.right['10']).fill()

    // right
    .move(-51, -521)
    .curve(-53, -540, -60, -550, -55, -570).absolute()
    // top
    .curve(-66, -569, -71, -568, -80, -569).absolute()
    .curve(-90, -570, -90, -573, -100, -575).absolute()
    .curve(-110, -577, -110, -573, -120, -575).absolute()
    .curve(-129, -578, -128, -580, -137, -584).absolute()
    .curve(-139, -585, -141, -586, -142, -586).absolute()
    // left
    .curve(-150, -567, -139, -548, -147.5, -519).absolute()
    .curve(-140, -502).absolute()
  //#endregion

  //#region 11th ridge
  drawer
    .path(data.danero.head.horn.right['11']).fill()

    // right
    .move(-60, -569.1)
    .curve(-59, -580, -61, -595, -55, -610).absolute()
    // top
    .curve(-65, -610, -68, -610, -75, -612).absolute()
    .curve(-83, -615, -82, -617, -90, -620).absolute()
    .curve(-100, -624, -100, -621, -110, -625).absolute()
    .curve(-116, -627, -115, -629, -120, -632).absolute()
    .curve(-122, -633, -123, -634, -124, -634).absolute()
    // left
    .curve(-132, -620.1, -128, -600.1, -141, -585.3).absolute()
    .curve(-140, -562).absolute()
  //#endregion

  //#region tip
  drawer
    .path(data.danero.head.horn.right.tip).fill()

    .move(-59, -610)
    .curve(-65, -640, -64, -667, -50, -690).absolute()
    .curve(-90, -682, -110, -655, -121.3, -632.5).absolute()
    .curve(-120, -612).absolute()
  //#endregion
}
