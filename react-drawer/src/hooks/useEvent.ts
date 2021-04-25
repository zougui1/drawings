import { useEffect } from 'react';

export const useEvent = (event: keyof WindowEventMap, listener: <T>(event: T) => void, dependencies: any[] = []): void => {
  useEffect(() => {
    window.addEventListener(event, listener);

    () => {
      window.removeEventListener(event, listener);
    }
  }, dependencies);
}
