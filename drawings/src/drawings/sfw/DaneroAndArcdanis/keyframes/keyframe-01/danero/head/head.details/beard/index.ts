import { Group } from 'drawer'

import { beardDetails } from './beard.details';
import { beardFill } from './beard.fill';
import { beardLineart } from './beard.lineart';
import { beardMixed } from './beard.mixed';

export const beard = (draw: Group) => {
  draw
    .group('beard-lineart', beardLineart)
    .group('beard-fill', beardFill)
    .group('beard-mixed', beardMixed)
    .group('beard-details', beardDetails)
}
