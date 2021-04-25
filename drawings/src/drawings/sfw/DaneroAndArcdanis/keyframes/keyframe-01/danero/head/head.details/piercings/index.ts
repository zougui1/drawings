import { Group } from 'drawer'

import { piercingsMixed } from './piercings.mixed';

export const piercings = (draw: Group) => {
  draw
    .group('piercings-mixed', piercingsMixed)
}
