import { Group } from 'drawer'

import { spikesMixed } from './spikes.mixed';

export const spikes = (drawer: Group) => {
  drawer
    .group('spikes-mixed', spikesMixed)
}
