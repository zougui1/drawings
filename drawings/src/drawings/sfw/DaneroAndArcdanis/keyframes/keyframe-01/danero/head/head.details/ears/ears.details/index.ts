import { Group } from 'drawer'

import { earsPiercingsDetailsMixed } from './ears-piercings.mixed';

export const earsDetails = (draw: Group) => {
  draw
    .group('ears-piercings-mixed', earsPiercingsDetailsMixed)
}
