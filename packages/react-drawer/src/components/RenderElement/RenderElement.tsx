import React, { memo } from 'react';
import { DrawingElementType, DrawingElementJSON, GroupJSON, PathJSON } from 'drawer';

import { Group } from '../Group';
import { Path } from '../Path';

const RenderElementNaked: React.FC<RenderElementProps> = ({ element, renderId }) => {
  switch (element.type) {
    case DrawingElementType.group:
      return <Group renderId={renderId} group={element as GroupJSON} />;
    case DrawingElementType.path:
      return <Path renderId={renderId} path={element as PathJSON} />;
  }

  throw new Error(`Invalid element '${element.type}'`);
}

export interface RenderElementProps {
  element: DrawingElementJSON;
  renderId?: boolean;
}

export const RenderElement = memo(RenderElementNaked)
