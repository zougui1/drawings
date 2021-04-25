import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const whiskersMixed = (drawer: Group) => {
  const y = 37

  //#region right whisker - fluff tip
  drawer
    .path(data.danero.head.whisker.right.tip)

    .move(540.7, 913 + y)
    // fluff tip
    .curve(542, 922 + y, 554, 928 + y).absolute()
    .curve(547, 928 + y, 543, 925 + y).absolute()

    .curve(554, 933 + y, 558, 947 + y).absolute()
    .curve(557, 944 + y, 553, 945 + y, 550, 940 + y).absolute()

    .curve(555, 954 + y, 554, 965 + y).absolute()
    .curve(553, 960 + y, 547, 952 + y).absolute()

    .curve(548, 967 + y, 539, 973 + y, 535, 979 + y).absolute()
    .curve(538, 970 + y, 535, 961 + y).absolute()

    .curve(533, 969 + y, 533, 975 + y).absolute()
    .curve(527, 970 + y, 527, 955 + y).absolute()

    .curve(524, 956 + y, 522, 960 + y).absolute()
    .curve(521, 955 + y, 522, 940 + y, 530, 930 + y).absolute()

    .curve(526, 930 + y, 522, 933 + y).absolute()
    .curve(530, 920 + y, 535, 921 + y, 539.9, 914 + y).absolute()
  //#endregion

  //#region left whisker - fluff tip
  drawer
    .path(data.danero.head.whisker.left.tip)

    // fluff tip
    .move(573.7, 899 + y)
    .curve(574, 905 + y, 581, 910 + y).absolute()
    .curve(578, 909.4 + y, 576, 908 + y).absolute()

    .curve(581, 912 + y, 587, 922 + y).absolute()
    .curve(585, 919.5 + y, 580, 917 + y).absolute()

    .curve(587, 928 + y, 589, 938 + y).absolute()
    .curve(586, 933 + y, 579, 928 + y).absolute()

    .curve(581, 937 + y, 578, 944 + y, 578, 950 + y).absolute()
    .curve(577, 945 + y, 574, 940 + y).absolute()

    .curve(573.7, 943 + y, 574, 948 + y).absolute()
    .curve(570, 946 + y, 566, 937 + y).absolute()

    .curve(563, 940 + y, 563, 945 + y).absolute()
    .curve(560, 936 + y, 562, 928 + y).absolute()

    .curve(556, 930 + y, 555, 934 + y).absolute()
    .curve(555, 924 + y, 560, 917 + y).absolute()

    .curve(556, 918 + y, 555, 920 + y).absolute()
    .curve(556, 913 + y, 563, 910 + y).absolute()

    .curve(561, 905 + y, 565, 911 + y, 573, 899 + y).absolute()
  //#endregion
}
