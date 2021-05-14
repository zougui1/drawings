import React from 'react';
import { Drawing } from 'react-drawer';

import './Canvas.css';
import {
  moveCanvas,
  zoomCanvas,
  resetTransform,
} from './canvasSlice';
import { Interactable } from '../../components/Interactable';
import { useAppSelector, useAppDispatch } from '../../store';

export const Canvas: React.FC = () => {
  const dispatch = useAppDispatch();

  const transform = useAppSelector(state => state.canvas.transform);
  const drawerData = useAppSelector(state => state.drawer.data);

  return (
    <div className="canvas-wrapper">
      <div id="canvas" className="canvas">
        <Interactable
          transform={transform}
          onMove={pos => dispatch(moveCanvas(pos))}
          onZoom={transform => dispatch(zoomCanvas(transform))}
          onReset={() => dispatch(resetTransform())}
        >
          {drawerData && <Drawing scale={transform.scale} />}
        </Interactable>
      </div>
    </div>
  );
}
