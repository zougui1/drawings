import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TimelineState {
  isPlaying: boolean;
  keyframe: number;
}

const initialState: TimelineState = {
  isPlaying: false,
  keyframe: 0,
};

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    changePlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    changeKeyframe: (state, action: PayloadAction<number>) => {
      state.keyframe = action.payload;
    },
  },
});

export const { changePlaying, changeKeyframe } = timelineSlice.actions;

export const timelineReducer = timelineSlice.reducer;
