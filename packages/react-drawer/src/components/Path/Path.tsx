import React from 'react';
import { PathJSON, pathDataToString } from 'drawer';

import { RenderAnimationElement } from '../animation-elements';

export const Path: React.FC<PathProps> = ({ path, renderId }) => {
  if (!path.pathData.length) {
    return null;
  }

  return (
    <path
      // or undefined to avoid setting the properties to empty values
      data-z-index={path.zIndex || undefined}
      data-name={path.name || undefined}
      id={renderId ? path.fullName : undefined}
      stroke={path.stroke}
      strokeWidth={path.strokeWidth}
      fill={path.fill}
      d={pathDataToString(path.pathData)}
    >
      {path.animations.map(animation => (
        <RenderAnimationElement key={animation.name} animation={animation} />
      ))}
      {/*path.animationElements.map(({ keyframes, ...e }) => {
        switch (e._type) {
          case Animate.type:
            return (
              <animate
                {...e}
                key={e.name}
                id={e.name}
                values={Keyframes.from(keyframes).toValues() || undefined}
                keyTimes={Keyframes.from(keyframes).toKeyTimes() || undefined}
                d={e.name}
              />
            );

          default:
            // @ts-ignore
            const { pathData, ...el } = e;

            return (
              <animateMotion
                {...el}
                key={e.name}
                id={e.name}
                values={Keyframes.from(keyframes).toValues() || undefined}
                keyTimes={Keyframes.from(keyframes).toKeyTimes() || undefined}
                d={e.name}
                path={PathData.fromArray(pathData).toString()}
              />
            );
        }
      })*/}
    </path>
  );
}

export interface PathProps {
  path: PathJSON;
  renderId?: boolean;
}
