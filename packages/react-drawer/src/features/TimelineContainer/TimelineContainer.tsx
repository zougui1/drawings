import React, { useContext } from 'react';
import { AnimationElementType } from 'drawer';

import { Timeline } from './Timeline';
import { DrawingContext } from '../../context';

export const TimelineContainer: React.FC = () => {
  const [drawingContext] = useContext(DrawingContext);

  if (!drawingContext.drawingData || drawingContext.drawingData.type !== AnimationElementType.animator) {
    return null;
  }

  return (
    <Timeline data={drawingContext.drawingData} />
  )
}
