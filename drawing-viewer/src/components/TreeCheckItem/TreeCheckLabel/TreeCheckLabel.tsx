import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import { OnCheck } from '../types';

export const TreeCheckLabel = ({ id, label, checked, onCheck }: TreeCheckLabelProps) => {
  return (
    <div>
      <FormControlLabel
        id={`treeview-checkbox-${id}`}
        control={<Checkbox />}
        label={label}
        checked={checked}
        onChange={() => onCheck({ id, checked: !checked })}
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
