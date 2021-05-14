import React from 'react';
import { FormControlLabel, Typography, Checkbox } from '@material-ui/core';

import { useStyles } from './TreeCheckLabel.styles';

export const TreeCheckLabel = ({ label, checked, onCheck }: TreeCheckLabelProps) => {
  const classes = useStyles();

  return (
    <div>
      <FormControlLabel
        className={classes.root}
        control={<Checkbox />}
        label={<Typography>{label}</Typography>}
        checked={checked}
        onChange={onCheck}
      />
    </div>
  )
}

export interface TreeCheckLabelProps {
  label?: string | JSX.Element;
  checked: boolean;
  onCheck: (e: React.ChangeEvent<{}>, checked: boolean) => void;
}

export const TreeCheckLabelMemo = React.memo(TreeCheckLabel);
