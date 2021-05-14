import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import './PreviewsTab.css';
import { changeCanvasViewSize, changeRefViewSize, addReferences } from '../../previews';
import { SizePicker } from '../../../components/SizePicker';
import { ImageInput } from '../../../components/ImageInput';
import { useAppSelector, useAppDispatch } from '../../../store';

export const PreviewsTab: React.FC = () => {
  const dispatch = useAppDispatch();

  const canvasPreview = useAppSelector(state => state.previews.canvasViewSize);
  const refViewSize = useAppSelector(state => state.previews.refViewSize);

  const handleChange = async (images: string[]) => {
    dispatch(addReferences(images));
  }

  return (
    <>
      <Grid container justify="space-around">
        <Grid container item xs={6} alignItems="center" direction="column">
          <Typography variant="h5" className="title">Drawing</Typography>

          <SizePicker
            label="Preview size"
            value={canvasPreview}
            onChange={newSize => dispatch(changeCanvasViewSize(newSize))}
          />
        </Grid>

        <Grid container item xs={6} alignItems="center" direction="column">
          <Typography variant="h5" className="title">References</Typography>

          <SizePicker
            label="Preview size"
            value={refViewSize}
            onChange={newSize => dispatch(changeRefViewSize(newSize))}
          />

          <ImageInput
            label="Drag image or paste link"
            placeholder="Reference link"
            onChange={handleChange}
            className="dark"
          />
        </Grid>
      </Grid>
    </>
  )
}
