import React from 'react';
import { TreeItem } from '@material-ui/lab';

import { useStyles } from './TreeCheckItem.styles';
import { TreeCheckLabel } from './TreeCheckLabel';
import { TreeParentLabel } from './TreeParentLabel';
import { Node } from '../types';

export const TreeCheckItem = ({ node, onCheck, onExpand }: TreeCheckItemProps) => {
  const classes = useStyles();

  const hasNodes = Array.isArray(node.nodes);
  const hasChildren = hasNodes && (node.nodes as Node[]).length > 0;

  const handleCheck = (e: React.ChangeEvent<{}>) => {
    onCheck({ id: node.id, checked: !node.checked });
  }

  return (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      classes={{
        group: classes.group,
        iconContainer: classes.iconContainer,
      }}
      label={!hasNodes ? (
        <TreeCheckLabel
          label={node.label}
          checked={node.checked}
          onCheck={handleCheck}
        />
      ) : (
      <TreeParentLabel
        node={node}
        onCheck={handleCheck}
        onExpand={onExpand}
      />
      )}
    >
      {hasChildren && (node.nodes as Node[]).map(node => (
        <TreeCheckItem
          key={node.id}
          node={node}
          onCheck={onCheck}
          onExpand={onExpand}
        />
      ))}
    </TreeItem>
  )
}

export interface TreeCheckItemProps {
  node: Node;
  onCheck: (data: { id: string, checked: boolean }) => any;
  onExpand: (id: string) => void;
}
