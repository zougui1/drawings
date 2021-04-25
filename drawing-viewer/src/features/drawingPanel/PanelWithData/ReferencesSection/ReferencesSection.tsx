import React, { useState } from 'react';
import { FormGroup, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { PanelSection } from '../PanelSection';
import { useDropzone } from './hooks';
import { changeRefViewSize, addReferences } from '../../../previews';
import { SizePicker } from '../../../../components/SizePicker';
import { useAppSelector, useAppDispatch } from '../../../../store';

export const ReferencesSection: React.FC = () => {
  const [refValue, setRefValue] = useState('');
  const dispatch = useAppDispatch();
  const refViewSize = useAppSelector(state => state.previews.refViewSize);
  const { getRootProps, getInputProps } = useDropzone();

  const handleSubmitRef = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();

    if (refValue) {
      dispatch(addReferences([refValue]));
      setRefValue('');
    }
  }

  return (
    <PanelSection title="References">
      <SizePicker
        label="Preview size"
        value={refViewSize}
        onChange={newSize => dispatch(changeRefViewSize(newSize))}
      />

      <FormGroup row>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag image or paste link</p>
        </div>
      </FormGroup>

      <FormGroup row>
        <form onSubmit={handleSubmitRef}>
          <TextField
            placeholder="Reference link"
            value={refValue}
            onChange={e => setRefValue(e.currentTarget.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSubmitRef}>
                  <AddIcon />
                </IconButton>
              )
            }}
          />
        </form>
      </FormGroup>
    </PanelSection>
  );
}
