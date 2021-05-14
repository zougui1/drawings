import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PreviewSize } from 'drawer';
import _ from 'lodash';

import { getOtherPreviewSize } from './utils';

export interface PreviewsState {
  canvasViewSize: PreviewSize;
  refViewSize: PreviewSize;
  references: string[];
}

const initialState: PreviewsState = {
  canvasViewSize: PreviewSize.small,
  refViewSize: PreviewSize.small,
  references: [],
};

export const previewsSlice = createSlice({
  name: 'previews',
  initialState,
  reducers: {
    changeCanvasViewSize: (state, action: PayloadAction<PreviewSize>) => {
      state.refViewSize = getOtherPreviewSize(state.canvasViewSize, action.payload) ?? state.refViewSize;
      state.canvasViewSize = action.payload;
    },
    changeRefViewSize: (state, action: PayloadAction<PreviewSize>) => {
      state.canvasViewSize = getOtherPreviewSize(state.refViewSize, action.payload) ?? state.canvasViewSize;
      state.refViewSize = action.payload;
    },
    addReferences: (state, action: PayloadAction<string[]>) => {
      state.references = _.uniq([...state.references, ...action.payload]);
    },
    removeReference: (state, action: PayloadAction<string>) => {
      state.references = state.references.filter(ref => ref !== action.payload);
    },
  },
});

export const {
  changeCanvasViewSize,
  changeRefViewSize,
  addReferences,
  removeReference,
} = previewsSlice.actions;

export const previewsReducer = previewsSlice.reducer;
