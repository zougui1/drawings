import React, { useState, useEffect } from 'react';

import { Interactable } from '../Interactable';

const defaultTransform = { x: 0, y: 0, scale: 1 };
const defaultId = '__standaloneInteractableDefaultId__';

export const StandaloneInteractable: React.FC<StandaloneInteractableProps> = ({ id, children }) => {
  const currentId = id ?? defaultId;
  const [transforms, setTransforms] = useState<Record<string, ITransform | undefined>>({});

  const currentTransform = transforms[currentId] ?? defaultTransform;

  useEffect(() => {
    if (!(currentId in transforms)) {
      setTransforms(transforms => ({
        ...transforms,
        [currentId]: defaultTransform,
      }));
    }
  }, [currentId, transforms]);

  const handleMove = (position: { x: number, y: number }) => {
    setTransforms(transforms => {
      const currentTransform = transforms[currentId] ?? defaultTransform;

      return {
        ...transforms,
        [currentId]: {
          ...currentTransform,
          ...position,
        },
      };
    });
  }

  const handleZoom = (transform: ITransform) => {
    setTransforms(transforms => ({
      ...transforms,
      [currentId]: transform,
    }));
  }

  const handleReset = () => {
    setTransforms(transforms => ({
      ...transforms,
      [currentId]: defaultTransform,
    }));
  }

  return (
    <Interactable
      transform={currentTransform}
      onMove={handleMove}
      onZoom={handleZoom}
      onReset={handleReset}
    >
      {children}
    </Interactable>
  );
}

interface ITransform {
  x: number;
  y: number;
  scale: number;
}

export interface StandaloneInteractableProps {
  id?: string | number;
}

export default StandaloneInteractable
