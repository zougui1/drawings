import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const hornLeftFill = (drawer: Group) => {
  //#region 1st ridge
  drawer
    .path(data.danero.head.horn.left['1']).fill()

    // left
    .move(575.4, 164.7)
    .curve(580, 120, 552, 70, 552, 20).absolute()
    // top
    .curve(537, 20, 516, 39, 497.5, 37).absolute()
    .curve(500, 76, 530, 92, 560, 137).absolute()
  //#endregion

  //#region 2nd ridge
  drawer
    .path(data.danero.head.horn.left['2']).fill()

    // left
    .move(548, 20.7)
    .curve(550, -10, 520, -45, 515, -85).absolute()
    // top
    .curve(508, -87, 488, -63, 450, -60).absolute()
    // close
    .curve(487, 45).absolute()
  //#endregion

  //#region 3rd ridge
  drawer
    .path(data.danero.head.horn.left['3']).fill()

    // left
    .move(512.8, -84.5)
    .curve(505, -120, 485, -140, 480, -170).absolute()
    // top
    .curve(471, -168, 470, -162, 462, -157).absolute()
    .curve(445, -146, 443, -150, 425, -143).absolute()
    .curve(420, -141, 417, -139, 415, -138).absolute()
    // close
    .curve(440, -45).absolute()
  //#endregion

  //#region 4th ridge
  drawer
    .path(data.danero.head.horn.left['4']).fill()

    // left
    .move(476, -168.1)
    .curve(467, -200, 445, -212, 437, -242).absolute()
    // top
    .curve(431, -238, 428, -231, 418, -224).absolute()
    .curve(403, -214, 401, -218, 385, -210).absolute()
    .curve(376, -206, 372, -203, 368, -200).absolute()
    // close
    .curve(410, -118).absolute()
  //#endregion

  //#region 5th ridge
  drawer
    .path(data.danero.head.horn.left['5']).fill()

    // left
    .move(434, -239)
    .curve(425, -262, 402, -267, 385, -298).absolute()
    // top
    .curve(379, -295, 378, -291, 372, -286).absolute()
    .curve(364, -280, 362, -283, 353, -278).absolute()
    .curve(343, -272, 344, -270, 334, -264).absolute()
    .curve(331, -262, 330, -262, 328, -262).absolute()
    // close
    .curve(368.3, -190).absolute()
  //#endregion

  //#region 6th ridge
  drawer
    .path(data.danero.head.horn.left['6']).fill()

    // left
    .move(383.5, -297)
    .curve(375, -315, 350, -323, 330, -349).absolute()
    // top
    .curve(323, -346, 322, -343, 317, -339).absolute()
    .curve(307, -332, 305, -335, 295, -327).absolute()
    .curve(286, -321, 287, -319, 279, -312).absolute()
    .curve(273, -307, 269, -304, 266, -302).absolute()
    // close
    .curve(334, -252).absolute()
  //#endregion

  //#region 7th ridge
  drawer
    .path(data.danero.head.horn.left['7']).fill()

    // left
    .move(325.2, -346)
    .curve(318, -365, 298, -378, 292, -398).absolute()
    // top
    .curve(284, -394, 281, -390, 273, -385).absolute()
    .curve(264, -380, 262, -384, 253, -380).absolute()
    .curve(242, -375, 244, -372, 233, -368).absolute()
    .curve(222, -363, 221, -365, 209, -362).absolute()
    .curve(206, -361, 204, -361, 203, -360).absolute()
    // left
    .curve(208, -347, 217, -339.8).absolute()
    .curve(268, -300).absolute()
  //#endregion

  //#region 8th ridge
  drawer
    .path(data.danero.head.horn.left['8']).fill()

    // left
    .move(288, -396)
    .curve(284, -413, 275, -418, 274, -437).absolute()
    // top
    .curve(266, -436, 263, -433, 255, -431).absolute()
    .curve(244, -428, 243, -432, 232, -430).absolute()
    .curve(221, -428, 221, -426, 210, -424).absolute()
    .curve(200, -423, 200, -424, 190, -424).absolute()
    .curve(187, -424, 186, -423, 185, -423).absolute()
    // left
    .curve(186, -400, 199, -394, 207, -362).absolute()
    .curve(215, -340).absolute()
  //#endregion

  //#region 9th ridge
  drawer
    .path(data.danero.head.horn.left['9']).fill()

    // left
    .move(269, -436)
    .curve(269, -455, 262, -462, 265, -478).absolute()
    // top
    .curve(256, -478, 253, -477, 245, -477).absolute()
    .curve(235, -478, 235, -480, 225, -481).absolute()
    .curve(215, -482, 215, -479, 205, -479).absolute()
    .curve(197, -479, 198, -481, 190, -482).absolute()
    .curve(188, -482, 186, -482, 185, -482).absolute()
    // left
    .curve(181, -463, 189, -457, 187, -423).absolute()
    .curve(195, -393).absolute()
  //#endregion

  //#region 10th ridge
  drawer
    .path(data.danero.head.horn.left['10']).fill()

    // left
    .move(262, -478)
    .curve(264, -498, 259, -503, 263, -516).absolute()
    // top
    .curve(253, -518, 250, -517, 243, -518).absolute()
    .curve(233, -519, 234, -523, 225, -525).absolute()
    .curve(218, -527, 217, -524, 210, -526).absolute()
    .curve(202, -527, 203, -528, 195, -530).absolute()
    .curve(193, -531, 191, -530, 190, -530).absolute()
    // left
    .curve(185.4, -507, 189.7, -500, 188, -482).absolute()
    .curve(195, -452).absolute()
  //#endregion

  //#region 11th ridge
  drawer
    .path(data.danero.head.horn.left['11']).fill()

    // left
    .move(259, -517)
    .curve(258, -524, 258, -534, 262, -550).absolute()
    // top
    .curve(256, -556, 253, -553, 248, -554).absolute()
    .curve(239, -555, 240, -559, 231, -562).absolute()
    .curve(225, -564, 224, -562, 218, -565).absolute()
    .curve(213, -567, 214, -569, 210, -571).absolute()
    .curve(208, -572, 206, -572, 205, -572).absolute()
    // left
    .curve(196, -557, 195, -545, 192, -530).absolute()
    .curve(200, -500).absolute()
  //#endregion

  //#region tip
  drawer
    .path(data.danero.head.horn.left.tip).fill()

    .move(260, -552)
    .curve(256, -574, 261, -596, 277, -615).absolute()
    .curve(254, -611, 220, -589, 206.4, -572).absolute()
    .curve(210, -560).absolute()
  //#endregion
}
