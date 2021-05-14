import React from 'react';
import { GroupJSON, transformToString } from 'drawer';

import { RenderElement } from '../RenderElement';
import { sortElementsByZIndex } from '../../utils';

export const Group: React.FC<GroupProps> = ({ group, renderId, id, children }) => {
  const elementId = id || (renderId ? group.fullName : undefined);

  return (
    <g
      // or undefined to avoid setting the properties to empty values
      data-z-index={group.zIndex || undefined}
      data-name={group.name || undefined}
      id={elementId}
      transform={transformToString(group.transform) || undefined}
    >
      {
        children ?? group.paths.sort(sortElementsByZIndex).map(path => (
          <RenderElement key={path.fullName} element={path} />
        ))
      }
    </g>
  );
}

export interface GroupProps {
  group: GroupJSON;
  renderId?: boolean;
  id?: string;
}
