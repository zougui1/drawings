import { createSlice } from '@reduxjs/toolkit';

import { Node } from '../../components/TreeCheckItem';

export type DebugTree = Node[];

export interface DrawingPanelState {
  displayTooltip: boolean;
}

const initialState: DrawingPanelState = {
  displayTooltip: true,
};

export const drawingPanelSlice = createSlice({
  name: 'drawingPanel',
  initialState,
  reducers: {
    toogleTooltip: state => {
      state.displayTooltip = !state.displayTooltip;
    },
  },
});

export const { toogleTooltip } = drawingPanelSlice.actions;

export const drawingPanelReducer = drawingPanelSlice.reducer;
