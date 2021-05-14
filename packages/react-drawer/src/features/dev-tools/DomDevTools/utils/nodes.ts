import { DrawerJSON, AnimatorJSON, transformToString } from 'drawer';

import { DomNode } from '../../../../types';
import { NodeData } from '../../../../context';

export const isPathNode = (node: DomNode): boolean => {
  return node.name === 'path';
}

export const getNodeData = (node: DomNode): NodeData => {
  return {
    id: node.id,
    pathData: node.attributes.pathData,
    strokeWidth: node.attributes.strokeWidth,
  };
}

export const getRootNode = (drawingData: DrawerJSON | AnimatorJSON, paths: DomNode[]): DomNode => {
  return {
    name: 'g',
    id: drawingData.root.fullName,
    attributes: {
      name: drawingData.root.name,
      transform: transformToString(drawingData.root.transform),
    },
    nodes: paths,
  };
}

export const getSvgNode = (drawingData: DrawerJSON | AnimatorJSON, paths: DomNode[]): DomNode => {
  return {
    name: 'svg',
    id: drawingData.slug,
    attributes: {
      id: drawingData.slug,
      width: drawingData.width,
      height: drawingData.height,
    },
    nodes: [getRootNode(drawingData, paths)],
  };
}

export const getAllSingleNodes = (node: DomNode): DomNode[] => {
  if (!node.nodes) {
    return [];
  }

  if (node.nodes.length === 1) {
    const singleNode = node.nodes[0];
    return [singleNode, ...getAllSingleNodes(singleNode)];
  }

  return [];
}
