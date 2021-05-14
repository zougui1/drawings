import React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from '@material-ui/core';

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...checkboxProps }) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox {...checkboxProps} />}
      label={label}
    />
  );
}

export interface CheckboxProps extends MuiCheckboxProps {
  label: string;
}
