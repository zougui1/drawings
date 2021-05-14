import React, { useState } from 'react';
import clsx from 'clsx';
import { FormGroup, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import './ImageInput.css';
import { useDropzone } from './hooks';

export const ImageInput: React.FC<ImageInputProps> = ({ className, placeholder, label, onChange }) => {
  const [refValue, setRefValue] = useState('');
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onChange });

  const handleSubmitRef = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();

    if (refValue) {
      onChange([refValue]);
      setRefValue('');
    }
  }

  return (
    <div className={clsx('image-input-root', className)}>
      <FormGroup row>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <span className="image-input-label">{label}</span>
        </div>
      </FormGroup>

      <FormGroup row>
        <form onSubmit={handleSubmitRef}>
          <TextField
            className="image-input-input"
            placeholder={placeholder}
            value={refValue}
            onChange={e => setRefValue(e.currentTarget.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSubmitRef}>
                  <AddIcon className="image-input-icon" />
                </IconButton>
              )
            }}
          />
        </form>
      </FormGroup>
    </div>
  )
}

export interface ImageInputProps {
  onChange: (files: string[]) => void;
  label?: React.ReactChild;
  placeholder?: string;
  className?: string;
}
