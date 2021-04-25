import { Group } from 'drawer'

import { beard } from './beard';
import { ears } from './ears';
import { eyes } from './eyes';
import { hornLeft } from './horn-left';
import { hornRight } from './horn-right';
import { nose } from './nose';
import { piercings } from './piercings';
import { scratches } from './scratches';
import { spikes } from './spikes';
import { whiskers } from './whiskers';

export const headDetails = (drawer: Group) => {
  drawer
    .group('beard', beard)
    .group('ears', ears)
    .group('eyes', eyes)
    .group('horn-left', hornLeft)
    .group('horn-right', hornRight)
    .group('nose', nose)
    .group('piercings', piercings)
    .group('scratches', scratches)
    .group('spikes', spikes)
    .group('whiskers', whiskers)
}
