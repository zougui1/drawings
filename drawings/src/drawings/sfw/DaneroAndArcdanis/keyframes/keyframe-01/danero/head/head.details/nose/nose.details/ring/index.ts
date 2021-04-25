import { Group } from 'drawer'

import { ringMixed } from './ring.mixed';

export const ring = (draw: Group) => {
  draw
    .group('ring-mixed', ringMixed)
}
