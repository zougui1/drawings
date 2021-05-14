import React, { useContext } from 'react';

import { DrawingContext } from '../../../context';

export const HighlightPaths: React.FC = () => {
  const [drawingContext] = useContext(DrawingContext);
  const { dom } = drawingContext;

  return (
    <>
      {dom.highlight.paths.map(path => (
        <path
          key={path.id}
          stroke="#b0c"
          fill="none"
          data-name="debug-segment-highlight"
          // thicker than path highlight so that it completely overlaps it
          strokeWidth={(path.strokeWidth ?? 1) + 0.6}
          d={path.pathData}
        />
      ))}
    </>
  )
}
