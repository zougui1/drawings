import React from 'react';
import { Typography } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';

import { TreeCheckLabel } from './TreeCheckLabel';
import { TreeParentLabel } from './TreeParentLabel';
import { Node, OnCheck } from './types';

export const TreeCheckItem = ({ node, onCheck }: TreeCheckItemProps) => {
  const hasNodes = Array.isArray(node.nodes);
  const hasChildren = hasNodes && (node.nodes as Node[]).length > 0;

  return (
    <TreeItem
      id={`treeview-item-${node.id}`}
      key={node.id}
      nodeId={node.id}
      style={{ backgroundColor: 'transparent', borderLeft: '1px dashed #aaa' }}
      label={
        !hasNodes ? (
          <TreeCheckLabel
            label={<Typography>{node.label}</Typography>}
            id={node.id}
            checked={node.checked}
            onCheck={onCheck}
          />
        ) : (
          <TreeParentLabel node={node} onCheck={onCheck} />
        )
      }
    >
      {
        hasChildren
          ? (node.nodes as Node[]).map(node => (
            <TreeCheckItem key={node.id} node={node} onCheck={onCheck} />
          ))
          : undefined
      }
    </TreeItem>
  )
}

export interface TreeCheckItemProps {
  node: Node;
  onCheck: OnCheck;
}

export const TreeCheckItemMemo = React.memo(TreeCheckItem);
