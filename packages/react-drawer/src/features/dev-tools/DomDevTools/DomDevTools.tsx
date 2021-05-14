import React, { useMemo, useContext } from 'react';
import { TreeView } from '@material-ui/lab';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { AnimationElementType, AnimatorJSON } from 'drawer';

import { useStyles } from './DomDevTools.styles';
import { makeDomTree, flattenTree, isPathNode, getNodeData, getSvgNode } from './utils';
import { HtmlNode } from './HtmlNode';
import { sortElementsByZIndex } from '../../../utils';
import { DrawingContext, hoverDomElement, leaveDomElement, toggleExpandDomElement, DisplayMode } from '../../../context';
import { DomNode } from '../../../types';

export const DomDevTools: React.FC<DomDevToolsProps> = () => {
  const [drawingContext, dispatch] = useContext(DrawingContext);
  const { drawingData, dom } = drawingContext;

  const classes = useStyles();
  const paths = useMemo(() => {
    console.log('make tree')
    if (dom.display.mode === DisplayMode.keyframe && drawingData.type === AnimationElementType.animator) {
      console.log('make keyframe tree')
      const animationData = drawingData as AnimatorJSON;
      const keyframeIndex = dom.display.keyframeIndex;
      return makeDomTree(animationData.keyframes[keyframeIndex].path.paths.slice().sort(sortElementsByZIndex));
    }

    console.log('make root paths tree')
    return makeDomTree(drawingData.root.paths.slice().sort(sortElementsByZIndex));
  }, [drawingData, dom.display.mode, dom.display.keyframeIndex]);

  const rootGroupId = `${drawingData.slug} > ${drawingData.root.name}`;

  const handleHover = (element: { node: DomNode, element: HTMLElement | null, rect: DOMRect | null } | null) => {
    if (!element) {
      return dispatch(leaveDomElement());
    }

    const rect = element.rect || element.element?.getBoundingClientRect();
    const nodesData: { id: string, pathData: string, strokeWidth?: number }[] = [];

    if (isPathNode(element.node)) {
      nodesData.push(getNodeData(element.node));
    }

    if (element.node.nodes) {
      const nodes = flattenTree(element.node.nodes)
      const paths = nodes.filter(isPathNode).map(getNodeData);

      nodesData.push(...paths);
    }

    dispatch(hoverDomElement({
      rect,
      nodes: nodesData,
    }));
  }

  const handleExpand = (nodeId: string | string[]) => {
    const nodeIds = Array.isArray(nodeId) ? nodeId : [nodeId];
    dispatch(toggleExpandDomElement(nodeIds));
  }

  return (
    <div className={classes.domViewerContent}>
      <TreeView
        defaultExpandIcon={<ArrowRightIcon />}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpanded={[drawingData.slug, rootGroupId]}
        expanded={dom.display.expanded}
      >
        <HtmlNode
          node={getSvgNode(drawingData, paths)}
          onHover={handleHover}
          onExpand={handleExpand}
        />
      </TreeView>
    </div>
  );
}

export interface DomDevToolsProps {

}
