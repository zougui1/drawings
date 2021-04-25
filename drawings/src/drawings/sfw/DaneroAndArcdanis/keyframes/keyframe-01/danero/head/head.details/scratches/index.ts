import { Group } from 'drawer'

import { scratchesMixed } from './scratches.mixed';

export const scratches = (draw: Group) => {
  draw
    .group('scratches-mixed', scratchesMixed)
}
