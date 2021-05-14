import React from 'react';
import { AnimateJSON, keyframeTimesToString, keyframeValuesToString } from 'drawer';

export const Animate: React.FC<AnimateProps> = ({ animate }) => {
  return (
    <animate
      attributeName={animate.attributeName}
      attributeType={animate.attributeType}
      dur={`${animate.duration}s`}
      repeatCount="indefinite"
      values={keyframeValuesToString(animate.keyframes)}
      keyTimes={keyframeTimesToString(animate.keyframes)}
    />
  );
}

export interface AnimateProps {
  animate: AnimateJSON;
}
