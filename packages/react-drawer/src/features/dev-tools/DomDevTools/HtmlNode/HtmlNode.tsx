import React, { useContext } from 'react';

import { HtmlElement } from '../HtmlElement';
import { computeNodeBounding, getAllSingleNodes } from '../utils';
import { DrawingContext, DisplayMode } from '../../../../context';
import { DomNode } from '../../../../types';

export const HtmlNode: React.FC<HtmlNodeProps> = ({ node, onHover, onExpand }) => {
  const [drawingContext] = useContext(DrawingContext);
  const { dom } = drawingContext;

  const isKeyframeDisplayMode = dom.display.mode === DisplayMode.keyframe;
  const areAnimationNodes = node.nodes && node.nodes[0].name === 'animate';
  const nodes = isKeyframeDisplayMode && areAnimationNodes ? undefined : node.nodes;

  const handleHover = (element: HTMLElement | null, type: 'enter' | 'leave') => {
    if (type === 'leave') {
      onHover?.(null);
    } else if (node.nodes) {
      onHover?.({
        element,
        rect: computeNodeBounding(node),
        node,
      });
    } else {
      onHover?.({
        element,
        rect: element?.getBoundingClientRect() ?? null,
        node,
      });
    }
  }

  const handleExpand = (nodeId: string | string[]) => {
    const nodeIds = Array.isArray(nodeId) ? nodeId : [nodeId];
    const singleNodes = getAllSingleNodes(node);
    const singlesId = singleNodes
      // prevents the open single nodes to close when their parent is closed then reopened
      .filter(node => !dom.display.expanded.includes(node.id))
      .map(node => node.id);

    onExpand([...nodeIds, ...singlesId]);
  }

  return (
    <HtmlElement
      nodeId={node.id}
      name={node.name}
      onHover={handleHover}
      onExpand={handleExpand}
      attributes={node.attributes}
      node={node}
      attributesIgnores={{
        strokeWidth: 1,
        z: 0,
      }}
    >
      {nodes?.map(node => (
        <HtmlNode key={node.id} node={node} onHover={onHover} onExpand={onExpand} />
      ))}
    </HtmlElement>
  );
}

export interface HtmlNodeProps {
  node: DomNode;
  onHover?: (element: { node: DomNode, element: HTMLElement | null, rect: DOMRect | null } | null) => void;
  onExpand: (nodeId: string | string[]) => void;
}
