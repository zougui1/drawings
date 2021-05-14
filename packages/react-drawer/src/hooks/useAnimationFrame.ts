import { useEffect, useRef } from 'react';

export const useAnimationFrame = (callback: (animation: UseAnimationFrameActions) => void, dependencies: any[] = []): void => {
  const animationFrame = useRef<number | undefined>();

  const animation: UseAnimationFrameActions = {
    nextFrame: () => {
      animationFrame.current = requestAnimationFrame(() => callback(animation));
    },
  };

  useEffect(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    callback(animation);
  }, dependencies);
}

export interface UseAnimationFrameActions {
  nextFrame: () => void;
}
