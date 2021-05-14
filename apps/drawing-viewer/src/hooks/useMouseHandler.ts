import { useEffect } from 'react';

import { MouseHandler } from '../utils';
import { Listenable } from '../types';

export const useMouseHandler = (element: Listenable | undefined, listener: (handler: MouseHandler) => any, dependencies: any[] = []): void => {
  useEffect(() => {
    const mouseHandler = new MouseHandler(element);
    listener(mouseHandler);

    return () => {
      mouseHandler.dispose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
