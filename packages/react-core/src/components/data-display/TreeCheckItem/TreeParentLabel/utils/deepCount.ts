import { Node } from '../../../types';

export const deepCount = (node: Node): number => {
  const counts = [];

  if (node.nodes) {
    counts.push(node.nodes.length);

    for (const nNode of node.nodes) {
      counts.push(deepCount(nNode));
    }
  } else {
    counts.push(0);
  }

  return counts.reduce((count, current) => count + current, 0);
}
