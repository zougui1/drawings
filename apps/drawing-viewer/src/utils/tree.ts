import { PathJSON, unflattenPaths } from 'drawer';

import { Node } from '../components/TreeCheckItem';

export const updateNode = (node: Node, id: string, checked: boolean, parentChecked?: boolean): Node => {
  if (parentChecked != null) {
    if (!node.nodes) {
      return {
        ...node,
        checked: parentChecked,
      };
    }

    return {
      ...node,
      checked: parentChecked,
      nodes: node.nodes.map(subNode => updateNode(subNode, id, checked, parentChecked))
    };
  }

  if (node.id === id) {
    if (!node.nodes) {
      return {
        ...node,
        checked,
      };
    }

    return {
      ...node,
      checked,
      nodes: node.nodes.map(subNode => updateNode(subNode, id, checked, checked))
    };
  }

  if (!node.nodes) {
    return node;
  }

  return {
    ...node,
    nodes: node.nodes.map(subNode => updateNode(subNode, id, checked, parentChecked))
  };
}

export const flattenNode = (node: Node): Node[] => {
  let nodes: Node[] = [];

  nodes.push(node);

  if (node.nodes) {
    for (const subNode of node.nodes) {
      nodes = nodes.concat(flattenNode(subNode));
    }
  }

  return nodes;
}

export const flattenTree = (tree: Node): Node[] => {
  let nodes: Node[] = [];

  nodes.push(tree);

  if (tree.nodes) {
    for (const subNode of tree.nodes) {
      nodes = nodes.concat(flattenNode(subNode));
    }
  }

  return nodes;
}

const makeTree = (namespace: string, elements: Record<string, any>, checkedNodes: string[]): Node[] => {
  const nodes: Node[] = [];

  for (const [label, element] of Object.entries(elements)) {
    const id = `${namespace} > ${label}`;

    const node: Node = { id, label };

    if (Array.isArray(element)) {
      node.nodes = element.map(element => {
        return {
          id: element.fullName,
          label: element.name,
          checked: checkedNodes.includes(element.fullName),
        };
      });
    } else if(element && typeof element === 'object') {
      node.nodes = makeTree(id, element, checkedNodes);
    }

    nodes.push(node);
  }

  return nodes;
}

export const makeDebugElementsTree = (elements: PathJSON[], checkedNodes: string[]): Node[] => {
  const deepMap = unflattenPaths(elements);
  const nodes = makeTree('all', deepMap, checkedNodes);
  return nodes;
}

export const getCheckedElementsId = (debugElements?: Node | null): string[] => {
  if (!debugElements) {
    return [];
  }

  return flattenTree(debugElements)
    .filter(node => node.checked)
    .map(node => node.id);
}
