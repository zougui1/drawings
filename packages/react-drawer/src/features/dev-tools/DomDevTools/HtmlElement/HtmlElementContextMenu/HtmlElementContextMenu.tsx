import React, { useContext } from 'react';
import { MenuItem } from '@material-ui/core';
import { PayloadAction } from '@reduxjs/toolkit';

import { flattenTree } from '../../utils';
import { DrawingContext, hideElements, showElements, showDebugDots, hideDebugDots } from '../../../../../context';
import { DomNode } from '../../../../../types';

const HtmlElementContextMenuNaked: React.ForwardRefRenderFunction<any, HtmlElementContextMenuProps> = ({ node }, ref) => {
  const [drawingContext, dispatch] = useContext(DrawingContext);
  const { drawing, debug } = drawingContext;

  const isHidden = drawing.hiddenElements.includes(node.id);
  const showsDots = debug.elements.includes(node.id);
  const children = flattenTree(node.nodes || []);

  const hasHiddenChildren = children.some(node => drawing.hiddenElements.includes(node.id));
  const showsChildrenDots = children.some(node => debug.elements.includes(node.id));

  const nodesAction = (nodes: DomNode[], action: (nodesId: string[]) => PayloadAction<string[]>) => {
    const nodesId = nodes.map(node => node.id);
    dispatch(action(nodesId));
  }

  const toggleShowElement = () => {
    const nodes = [node, ...children];
    nodesAction(nodes, isHidden ? showElements : hideElements);
  }

  const toggleShowChildren = () => {
    nodesAction(children, hasHiddenChildren ? showElements : hideElements);
  }

  const toggleShowDots = () => {
    const nodes = [node, ...children];
    nodesAction(nodes, showsDots ? hideDebugDots : showDebugDots);
  }

  const toggleShowChildrenDots = () => {
    nodesAction(children, showsChildrenDots ? hideDebugDots : showDebugDots);
  }

  return (
    <>
      <MenuItem onClick={toggleShowElement}>{isHidden ? 'Show element' : 'Hide element'}</MenuItem>
      <MenuItem onClick={toggleShowChildren}>{hasHiddenChildren ? 'Show children' : 'Hide children'}</MenuItem>
      <MenuItem onClick={toggleShowDots}>{showsDots ? 'Hide dots' : 'Show dots'}</MenuItem>
      <MenuItem onClick={toggleShowChildrenDots}>{showsChildrenDots ? 'Hide children dots' : 'Show children dots'}</MenuItem>
    </>
  );
}

export interface HtmlElementContextMenuProps {
  node: DomNode;
}

export const HtmlElementContextMenu = React.forwardRef(HtmlElementContextMenuNaked);
