import { Group } from 'drawer'

import { ears } from './ears';
import { tongue } from './tongue';
import { hornLeft } from './horn-left';


export const headDetails = (draw: Group) => {
  draw
    .group('ears', ears)
    .group('tongue', tongue)
    .group('hornLeft', hornLeft)
}
