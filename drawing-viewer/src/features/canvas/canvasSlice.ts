import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CanvasState {
  transform: {
    scale: number;
    x: number;
    y: number;
  };
  flat: boolean;
}

const initialState: CanvasState = {
  transform: {
    scale: 2.08,
    x: -2201,
    y: -2039,
  },
  flat: true,
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    moveCanvas: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.transform.x = action.payload.x;
      state.transform.y = action.payload.y;
    },
    zoomCanvas: (state, action: PayloadAction<{ x: number; y: number, scale: number }>) => {
      state.transform.scale = action.payload.scale;
      state.transform.x = action.payload.x;
      state.transform.y = action.payload.y;
    },
    resetTransform: state => {
      state.transform = initialState.transform;
    },
    changeFlat: state => {
      state.flat = !state.flat;
    },
  },
});

export const { moveCanvas, zoomCanvas, resetTransform, changeFlat } = canvasSlice.actions;

export const canvasReducer = canvasSlice.reducer;
