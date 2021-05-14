import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { drawerReducer } from './drawerSlice';
import { canvasReducer } from '../features/canvas';
import { drawingPanelReducer } from '../features/drawingPanel';
import { previewsReducer } from '../features/previews';
import { timelineReducer } from '../features/timeline';

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    drawer: drawerReducer,
    drawingPanel: drawingPanelReducer,
    previews: previewsReducer,
    timeline: timelineReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
