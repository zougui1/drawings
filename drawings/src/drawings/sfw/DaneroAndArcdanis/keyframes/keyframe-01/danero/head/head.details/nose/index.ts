import { Group } from 'drawer'

import { noseDetails } from './nose.details';
import { noseLineart } from './nose.lineart';

export const nose = (draw: Group) => {
  draw
    .group('nose-lineart', noseLineart)
    .group('nose-details', noseDetails)
}
