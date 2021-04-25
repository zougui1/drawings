import { Group } from 'drawer'

import { head } from './head';

export const danero = (draw: Group) => {
  draw
    .group('head', head)
}
