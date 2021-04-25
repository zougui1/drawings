import React from 'react';
import { Path as PathBuilder, PathObject, Animate, Keyframes, PathData } from 'drawer';

export const Path: React.FC<PathProps> = ({ path }) => {
  const _path = PathBuilder.fromObject(path);

  if (_path.pathData.isEmpty()) {
    //return null;
  }

  return (
    <path
      // or undefined to avoid setting the properties to empty values
      data-z-index={_path.getZIndex() || undefined}
      data-name={_path.getName() || undefined}
      stroke={_path.getStroke()}
      strokeWidth={_path.getStrokeWidth()}
      fill={_path.getFill()}
      transform={_path.getTransform() || undefined}
      d={_path.pathData.toString()}
    >
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
  path: PathObject;
}
