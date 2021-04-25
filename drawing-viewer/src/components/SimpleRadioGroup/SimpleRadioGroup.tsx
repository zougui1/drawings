import React from 'react';
import { RadioGroup, RadioGroupProps } from '@material-ui/core';

import { Radio } from '../Radio';

export const SimpleRadioGroup: React.FC<SimpleRadioGroupProps> = ({ value, onChange, options }) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      {options.map(option => (
        <Radio key={option.value} label={option.label} value={option.value} />
      ))}
    </RadioGroup>
  );
}

export interface SimpleRadioGroupProps {
  value: RadioGroupProps['value'];
  onChange: RadioGroupProps['onChange'];
  options: { label: string; value: string; }[];
}
