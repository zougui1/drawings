import { useEffect } from 'react';

export const useEvent = <K extends keyof WindowEventMap>(event: K, listener: (event: WindowEventMap[K]) => void, dependencies: any[] = []): void => {
  useEffect(() => {
    window.addEventListener(event, listener);

    return () => {
      window.removeEventListener(event, listener);
    }
  }, dependencies);
}
