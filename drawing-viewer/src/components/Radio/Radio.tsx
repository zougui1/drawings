import React from 'react';
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  FormControlLabel,
} from '@material-ui/core';

export const Radio: React.FC<RadioProps> = ({ label, value, ...radioProps }) => {
  return (
    <FormControlLabel
      control={<MuiRadio {...radioProps} />}
      label={label}
      value={value}
    />
  );
}

export interface RadioProps extends MuiRadioProps {
  label: string;
}
