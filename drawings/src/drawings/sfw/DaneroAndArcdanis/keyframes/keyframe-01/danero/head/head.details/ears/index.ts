import { Group } from 'drawer'

import { earsDetails } from './ears.details';
import { earsFill } from './ears.fill';
import { earsLineart } from './ears.lineart';
import { earsMixed } from './ears.mixed';

export const ears = (draw: Group) => {
  draw
    .group('ears-lineart', earsLineart)
    .group('ears-fill', earsFill)
    .group('ears-mixed', earsMixed)
    .group('ears-details', earsDetails)
}
