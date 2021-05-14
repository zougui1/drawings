import React from 'react';
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  FormControlLabel,
} from '@material-ui/core';

import './Radio.css';

export const Radio: React.FC<RadioProps> = ({ label, value, ...radioProps }) => {
  return (
    <FormControlLabel
      control={<MuiRadio
        {...radioProps}
        className="radio"
        classes={{ checked: 'checked' }}
      />}
      label={label}
      value={value}
    />
  );
}

export interface RadioProps extends MuiRadioProps {
  label: string;
}
