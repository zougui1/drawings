import React from 'react';
import { Typography, Checkbox } from '@material-ui/core';

import { deepCount } from './utils';
import { useStyles } from './TreeParentLabel.styles';
import { Node } from '../../types';

export const TreeParentLabel = ({ node, onCheck, onExpand }: TreeParentLabelProps) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <span onClick={() => onExpand(node.id)} className={classes.labelContainer}>
        <Typography className={classes.label}>
          {node.label}
          {node.nodes && (
            <span className={classes.count}>
              ({deepCount(node)})
            </span>
          )}
        </Typography>
      </span>

      <Checkbox checked={node.checked} onChange={onCheck} />
    </span>
  );
}

export interface TreeParentLabelProps {
  node: Node;
  onCheck: (e: React.ChangeEvent<{}>, checked: boolean) => void;
  onExpand: (id: string) => void;
}

export const TreeParentLabelMemo = React.memo(TreeParentLabel);
