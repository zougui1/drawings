import React, { createContext, useReducer, useEffect } from 'react';
import { DrawerJSON, AnimatorJSON } from 'drawer';
import ErrorBoundary from 'react-error-boundaries';

import { initialState, drawingReducer, drawingSlice, updateDrawingData, DrawingState } from './drawingSlice';

type DrawingActions = typeof drawingSlice.actions;
export type DrawingDispatch = (drawingContext: ReturnType<DrawingActions[keyof DrawingActions]>) => void;

const defaultDispatch: DrawingDispatch = () => {}

export const DrawingContext = createContext<[DrawingState, DrawingDispatch]>([initialState, defaultDispatch]);

export const DrawingProvider: React.FC<{ drawingData: DrawerJSON | AnimatorJSON }> = ({ drawingData, children }) => {
  const [drawingContext, dispatch] = useReducer(drawingReducer, initialState);

  useEffect(() => {
    dispatch(updateDrawingData(drawingData));
  }, [drawingData]);

  // TODO this changes the `defaultExpanded` props of the TreeView inside DomDevTools
  // TODO use `expanded` instead so that it doesn't rise an error
  const _drawingContext = {
    ...drawingContext,
    drawingData,
  };

  return (
    <DrawingContext.Provider value={[_drawingContext, dispatch]}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </DrawingContext.Provider>
  );
}
