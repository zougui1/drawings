import {
  pathDataToString,
  unflattenPaths,
  DrawingElementType,
  AnimationElementType,
  PathJSON,
  AnimationElementJSON,
  AnimateJSON,
  keyframeTimesToString,
  keyframeValuesToString,
} from 'drawer';

import { DomNode } from '../../../../types';
import { computeElementsBounding } from '../../../../utils';

const getNode = (element: Record<string, any>): DomNode => {
  switch (element.type) {
    case DrawingElementType.path:
      const path = element as PathJSON;
      return {
        id: path.fullName,
        name: 'path',
        attributes: {
          name: path.name,
          stroke: path.stroke,
          fill: path.fill,
          strokeWidth: path.strokeWidth,
          zIndex: path.zIndex,
          pathData: pathDataToString(path.pathData),
        },
      };

    case AnimationElementType.animate:
      const animate = element as AnimateJSON;
      return {
        id: animate.name,
        name: 'animate',
        attributes: {
          attributeName: animate.attributeName,
          attributeType: animate.attributeType,
          name: animate.name,
          duration: animate.duration,
          keyTimes: keyframeTimesToString(animate.keyframes),
          values: keyframeValuesToString(animate.keyframes, animate.attributeName === 'd'),
        },
      };

    default:
      console.log(element)
      throw new Error(`Can't render a DOM node of element type "${element.type}".`);
  }
}

const makeTree = (namespace: string, elements: Record<string, any>): DomNode[] => {
  const nodes: DomNode[] = [];

  for (const [name, element] of Object.entries(elements)) {
    const id = `${namespace} > ${name}`;
    const node: DomNode = { id, name: 'g', attributes: { name } };

    if (Array.isArray(element)) {
      node.nodes = element.map(element => {
        const pathNode: DomNode = getNode(element);

        if (element.animations?.length) {
          const animationNodes = makeTree(id, { animations: element.animations });
          pathNode.nodes = animationNodes[0]?.nodes;
        }

        return pathNode;
      });
    } else if (element && typeof element === 'object') {
      node.nodes = makeTree(id, element);
    }

    nodes.push(node);
  }

  return nodes;
}

export const makeDomTree = (elements: PathJSON[]): DomNode[] => {
  const deepMap = unflattenPaths(elements);
  const nodes = makeTree('all', deepMap);
  return nodes;
}

export const flattenTree = (nodes: DomNode[]): Omit<DomNode, 'nodes'>[] => {
  const flatNodes = nodes
    .map(({ nodes, ...node }) => [node, flattenTree(nodes ?? [])].flat())
    .flat();
  return flatNodes;
}

export const computeNodeBounding = (node: DomNode): DOMRect => {
  const nodes = flattenTree([node]);
  const elements = nodes
    .map(node => document.getElementById(node.id))
    .filter(elm => elm) as HTMLElement[];

  return computeElementsBounding(elements);
}
