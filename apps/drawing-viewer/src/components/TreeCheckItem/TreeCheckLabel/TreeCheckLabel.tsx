import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import { OnCheck } from '../types';

export const TreeCheckLabel = ({ id, label, checked, onCheck }: TreeCheckLabelProps) => {
  const handleCheck = (e: React.ChangeEvent<{}>) => {
    e.preventDefault();
    onCheck({ id, checked: !checked });
  }

  return (
    <div>
      <FormControlLabel
        id={`treeview-checkbox-${id}`}
        control={<Checkbox />}
        label={label}
        checked={checked}
        onChange={handleCheck}
      />
    </div>
  )
}

export interface TreeCheckLabelProps {
  id: string;
  label?: string | JSX.Element;
  checked?: boolean;
  onCheck: OnCheck;
}

export const TreeCheckLabelMemo = React.memo(TreeCheckLabel);
