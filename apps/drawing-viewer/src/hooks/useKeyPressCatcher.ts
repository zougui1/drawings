import { useEffect } from 'react';

import { KeyPressCatcher } from '../utils';
import { Listenable } from '../types';

type Listener = ((handler: KeyPressCatcher) => ((() => any) | void));

export const useKeyPressCatcher = (element: Listenable | undefined, listener: Listener, dependencies: any[] = []): void => {
  useEffect(() => {
    const keyPressCatcher = new KeyPressCatcher(element);
    const dispose = listener(keyPressCatcher);

    return () => {
      keyPressCatcher.dispose();

      if (dispose) {
        dispose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
