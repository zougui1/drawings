import React from 'react';
import { Typography, Checkbox } from '@material-ui/core';

import { Node, OnCheck } from '../types';

const deepCount = (node: Node): number => {
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

export const TreeParentLabel = ({ node, onCheck }: TreeParentLabelProps) => {
  return (
    <Typography>
      {node.label}
      {node.nodes && (
        <span>
          ({deepCount(node)})
        </span>
      )}
      <Checkbox
        checked={node.checked}
        onChange={() => onCheck({ id: node.id, checked: !node.checked })}
      />
    </Typography>
  );
}

export interface TreeParentLabelProps {
  node: Node;
  onCheck: OnCheck;
}

export const TreeParentLabelMemo = React.memo(TreeParentLabel);
