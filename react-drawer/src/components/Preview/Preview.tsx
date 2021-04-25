import React, { memo, useMemo } from 'react';
import { DrawerObject, PreviewSize, Transform } from 'drawer';

import { RenderElement } from '../RenderElement';
import { sortElementsByZIndex, flattenElements } from '../../utils';

const PreviewNaked: React.FC<PreviewProps> = ({ data, size }) => {
  const rootElements = data.root.children.slice();
  const elements = useMemo(() => {
    return flattenElements(rootElements).sort(sortElementsByZIndex);
  }, [rootElements]);

  const preview = data.previews[size ?? PreviewSize.small];

  return (
    <svg
      id={data.svgName}
      width={preview.width}
      height={preview.height}
      viewBox={`0 0 ${preview.width} ${preview.height}`}
      className="drawer-svg"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transformOrigin: '0 0', transition: 'all .3s', backgroundColor: '#fff' }}
    >
      <g transform={Transform.fromObject(preview.transform).toString() || undefined}>
        {elements.map(element => (
          <RenderElement key={element.id} element={element} />
        ))}
      </g>
    </svg>
  );
}

export interface PreviewProps {
  data: DrawerObject;
  size?: PreviewSize;
  displayTooltip?: boolean;
  debugElements?: string[];
  scale?: number;
}

export const Preview = memo(PreviewNaked);
