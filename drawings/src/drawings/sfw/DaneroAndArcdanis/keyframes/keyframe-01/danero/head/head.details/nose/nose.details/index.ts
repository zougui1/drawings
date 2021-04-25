import { Group } from 'drawer'

import { ring } from './ring';

export const noseDetails = (draw: Group) => {
  draw
    .group('nose-ring', ring)
}
