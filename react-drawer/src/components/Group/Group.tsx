import React from 'react';
import { Group as GroupBuilder, GroupObject } from 'drawer';

import { RenderElement } from '../RenderElement';
import { sortElementsByZIndex } from '../../utils';

export const Group: React.FC<GroupProps> = ({ group, children }) => {
  const _group = GroupBuilder.fromObject(group);

  if (_group.isEmpty()) {
    return null;
  }

  return (
    <g
      // or undefined to avoid setting the properties to empty values
      data-z-index={_group.getZIndex() || undefined}
      data-name={_group.getName() || undefined}
      transform={_group.getTransform() || undefined}
    >
      {
        children ?? _group.elements.sort(sortElementsByZIndex).map(element => (
          <RenderElement key={element.id} element={element.toObject()} />
        ))
      }
    </g>
  );
}

export interface GroupProps {
  group: GroupObject;
}
