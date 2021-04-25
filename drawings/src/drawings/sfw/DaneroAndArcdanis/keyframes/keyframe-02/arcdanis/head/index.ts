import { Group } from 'drawer'

import { headDetails } from './head.details';

export const head = (draw: Group) => {
  draw
    .group('head-details', headDetails)
}
