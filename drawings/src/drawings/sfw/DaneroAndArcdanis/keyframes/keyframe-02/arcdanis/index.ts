import { Group } from 'drawer'

import { head } from './head';

export const arcdanis = (draw: Group) => {
  draw
    .group('head', head)
}
