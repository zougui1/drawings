import React from 'react';
import { FormControl, FormLabel } from '@material-ui/core';
import { PreviewSize } from 'drawer';

import { getSize } from './utils';
import { SimpleRadioGroup } from '../SimpleRadioGroup';

export const SizePicker: React.FC<SizePickerProps> = ({ label, value, onChange }) => {

  return (
    <FormControl component="fieldset">
      <FormLabel>{label}</FormLabel>

      <SimpleRadioGroup
        value={value}
        onChange={(e, newValue) => onChange(getSize(newValue))}
        options={[
          { label: 'Small', value: PreviewSize.small },
          { label: 'Half screen', value: PreviewSize.halfScreen },
          { label: 'Full screen', value: PreviewSize.fullscreen },
        ]}
      />
    </FormControl>
  );
}

export interface SizePickerProps {
  label: string;
  value: PreviewSize;
  onChange: (size: PreviewSize) => void;
}
