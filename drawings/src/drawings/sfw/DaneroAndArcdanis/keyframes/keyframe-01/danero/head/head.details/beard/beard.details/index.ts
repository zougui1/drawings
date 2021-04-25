import { Group } from 'drawer'

import { ring } from './ring';

export const beardDetails = (draw: Group) => {
  draw
    .group('ring', ring)
}
