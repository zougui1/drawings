import { Group } from 'drawer'

import { tongueMixed } from './tongue.mixed';

export const tongue = (draw: Group) => {
  draw
    .group('tongue-mixed', tongueMixed)
}
