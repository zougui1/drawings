import { Group } from 'drawer';

import { data } from '../../../../../../data';

export const beardMixed = (drawer: Group) => {
  const x = 60;
  const y = 45;

  //#region braid; stroke & fill
  drawer
    .path(data.danero.head.beard.fluff)

    .move(384.8, 630.6).absolute()
    // braid - left -1st
    .curve(325 + x, 586 + y).absolute()
    .curve(350 + x, 634 + y, 388 + x, 630 + y, 403 + x, 675 + y).absolute()
    .curve(407 + x, 694 + y, 399 + x, 717 + y).absolute()
    .move(403 + x, 675 + y).absolute()
    // to snout connection
    .curve(407 + x, 664 + y, 407 + x, 653 + y).absolute()
    // braid - left -2nd
    .move(334 + x, 600.5 + y).absolute()
    .curve(329 + x, 618 + y, 333 + x, 644 + y).absolute()
    .curve(350 + x, 683 + y, 380 + x, 677 + y, 399 + x, 717 + y).absolute()
    .curve(404 + x, 729 + y, 400 + x, 752 + y).absolute()
    // braid - left -3rd
    .move(340 + x, 656.7 + y).absolute()
    .curve(334 + x, 672 + y, 340 + x, 697 + y).absolute()
    .curve(360 + x, 728 + y, 380 + x, 721 + y, 400 + x, 752 + y).absolute()
    .curve(405 + x, 767 + y, 402 + x, 782 + y).absolute()
    // braid - left -4th
    .move(344 + x, 703 + y).absolute()
    .curve(339 + x, 716 + y, 345 + x, 737 + y).absolute()
    .curve(357 + x, 758 + y, 380 + x, 756 + y, 402 + x, 782 + y).absolute()
    .curve(405 + x, 790 + y, 402 + x, 808 + y).absolute()
    // braid - left -5th
    .move(349 + x, 742.4 + y).absolute()
    .curve(345 + x, 754 + y, 351 + x, 772 + y).absolute()
    .curve(363 + x, 790 + y, 380 + x, 786 + y, 402 + x, 808 + y).absolute()
    .curve(405 + x, 817 + y, 402 + x, 834 + y).absolute()
    // braid - left -6th
    .move(354 + x, 775.5 + y).absolute()
    .curve(351 + x, 786 + y, 362 + x, 808 + y).absolute()
    .curve(365 + x, 816 + y, 380 + x, 812 + y, 402 + x, 834 + y).absolute()
    .curve(462, 878).absolute()

    // braid - right - 1st
    .move(497, 677.7).absolute()
    .curve(424 + x, 663 + y, 414 + x, 667 + y, 403.7 + x, 673 + y).absolute()
    // braid - right - 2nd
    .move(485, 699.8).absolute()
    .curve(488, 717, 472, 747, 463, 747).absolute()
    // braid - right - 3rd
    .move(482.57, 720).absolute()
    .curve(485, 757, 472, 778, 461.54, 784).absolute()
    // braid - right - 4th
    .move(477.88, 761).absolute()
    .curve(480, 780, 475, 805, 463, 812).absolute()
    // braid - right - 5th
    .move(475, 793.6).absolute()
    .curve(476, 813, 473, 830, 463.265, 843).absolute()
    // braid - right - 6th
    .move(472, 825.2).absolute()
    .curve(473, 837, 473, 852, 463.43, 868).absolute()
  //#endregion

  //#region fluff tip; stroke & fill
  drawer
    .path(data.danero.head.beard.tip)

    // fluffy tip
    .move(429, 872).absolute()
    .curve(421, 884, 422.3, 893).absolute()
    .curve(423, 892).absolute()

    .curve(422, 906, 425, 902, 426, 910).absolute()
    .curve(425.5, 907, 426.8, 905).absolute()

    .curve(427.2, 920, 432.5, 923, 432, 928).absolute()
    .curve(432, 926, 434, 924).absolute()

    .curve(435, 927, 435, 935.7, 432.4, 935).absolute()
    .curve(434, 936, 436, 933.7).absolute()

    // tip
    .curve(439, 949, 445, 953).absolute()
    .curve(444, 944, 452, 943, 462, 925).absolute()

    .curve(462.4, 926, 462.5, 928).absolute()
    .curve(471, 920, 471, 910).absolute()

    .curve(472, 911, 472, 915).absolute()
    .curve(476.5, 905, 475, 897).absolute()

    .curve(476.3, 898, 477.2, 902.5).absolute()
    .curve(478, 890, 475, 882, 470.5, 874).absolute()
  //#endregion
}
