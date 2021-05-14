import { Node } from '../../../components/TreeCheckItem';

export const updateNode = (node: Node, id: string, checked: boolean, parentChecked: null | boolean): Node => {
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
