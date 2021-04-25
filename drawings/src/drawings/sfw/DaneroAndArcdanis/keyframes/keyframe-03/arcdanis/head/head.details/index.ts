import { Group } from 'drawer'

import { tongue } from './tongue';


export const headDetails = (draw: Group) => {
  draw
    .group('tongue', tongue)
}
