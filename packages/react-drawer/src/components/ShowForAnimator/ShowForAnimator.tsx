import React, { useContext } from 'react';
import { AnimationElementType } from 'drawer';

import { DrawingContext } from '../../context';

export const ShowForAnimator: React.FC = ({ children }) => {
  const [drawingContext] = useContext(DrawingContext);
  const { drawingData } = drawingContext;

  return drawingData.type === AnimationElementType.animator
    ? <>{children}</>
    : null;
}
