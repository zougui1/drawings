import React from 'react';
import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControlLabel,
} from '@material-ui/core';

export const Switch: React.FC<SwitchProps> = ({ label, ...switchProps }) => {
  return (
    <FormControlLabel
      control={<MuiSwitch {...switchProps} />}
      label={label}
    />
  );
}

export interface SwitchProps extends MuiSwitchProps {
  label: string;
}
