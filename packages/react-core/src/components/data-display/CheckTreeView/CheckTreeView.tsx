import React, { useState } from 'react';
import { TreeView, SingleSelectTreeViewProps } from '@material-ui/lab';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Node } from '../types';
import { TreeCheckItem } from '../TreeCheckItem';

export const CheckTreeView: React.FC<CheckTreeViewProps> = ({ tree, defaultExpanded, onCheck, ...props }) => {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded ?? []);

  const nodes = Array.isArray(tree) ? tree : [tree];

  const handleExpand = (id: string) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(expanded => expanded !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  }


  return (
    <TreeView
      defaultExpandIcon={<ArrowRightIcon />}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      {...props}
      expanded={expanded}
    >
      {nodes.map(node => (
        <TreeCheckItem
          key={node.id}
          node={node}
          onCheck={onCheck}
          onExpand={handleExpand}
        />
      ))}
    </TreeView>
  );
}

export interface CheckTreeViewProps extends Omit<SingleSelectTreeViewProps, 'expanded'> {
  tree: Node | Node[];
  onCheck: (data: { id: string, checked: boolean }) => void;
}
