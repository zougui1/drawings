import React, { memo, useMemo, useContext } from 'react';
import { PreviewSize, Transform } from 'drawer';

import { RenderElement } from '../../components/RenderElement';
import { sortElementsByZIndex, flattenElements } from '../../utils';
import { DrawingContext } from '../../context';

const PreviewNaked: React.FC<PreviewProps> = ({ size }) => {
  const [drawingContext] = useContext(DrawingContext);

  const elements = useMemo(() => {
    if (!drawingContext.drawingData) {
      return [];
    }

    return flattenElements(drawingContext.drawingData.root.paths.slice()).sort(sortElementsByZIndex);
  }, [drawingContext.drawingData?.root.paths]);

  if (!drawingContext.drawingData) {
    return null;
  }

  const preview = drawingContext.drawingData.previews[size ?? PreviewSize.small];

  return (
    <svg
      width={preview.width}
      height={preview.height}
      viewBox={`0 0 ${preview.width} ${preview.height}`}
      className="drawer-svg"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transformOrigin: '0 0', transition: 'all .3s', backgroundColor: '#fff' }}
    >
      <g transform={Transform.fromJSON(preview.transform).toString() || undefined}>
        {elements.map(element => (
          <RenderElement key={element.fullName} element={element} />
        ))}
      </g>
    </svg>
  );
}

export interface PreviewProps {
  size?: PreviewSize;
  displayTooltip?: boolean;
  debugElements?: string[];
  scale?: number;
}

export const Preview = memo(PreviewNaked);
