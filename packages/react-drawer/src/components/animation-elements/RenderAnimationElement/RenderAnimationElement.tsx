import React from 'react';
import { AnimationElementJSON, AnimateJSON, AnimationElementType } from 'drawer';

import { Animate } from '../Animate';

export const RenderAnimationElement: React.FC<RenderAnimationElementProps> = ({ animation }) => {
  switch (animation.type) {
    case AnimationElementType.animate:
      return <Animate animate={animation as AnimateJSON} />;

    default:
      throw new Error(`Invalid animation type "${animation.type}".`);
  }
}

export interface RenderAnimationElementProps {
  animation: AnimationElementJSON;
}
