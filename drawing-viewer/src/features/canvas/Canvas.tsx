import React, { useMemo, useCallback } from 'react';
import { Svg } from 'react-drawer';
import { AnimationJSON } from 'drawer';

import './Canvas.css';
import {
  moveCanvas,
  zoomCanvas,
  resetTransform,
} from './canvasSlice';
import { changePlaying, changeKeyframe } from '../timeline';
import { Interactable } from '../../components/Interactable';
import { useAppSelector, useAppDispatch } from '../../store';
import { getCheckedElementsId } from '../../utils';

export const Canvas: React.FC = () => {
  const dispatch = useAppDispatch();

  const transform = useAppSelector(state => state.canvas.transform);
  const displayTooltip = useAppSelector(state => state.drawingPanel.displayTooltip);

  const drawerData = useAppSelector(state => state.drawer.data);
  const debugElements = useAppSelector(state => state.drawer.debugElements);
  const flatCanvas = useAppSelector(state => state.canvas.flat);

  const isPlaying = useAppSelector(state => state.timeline.isPlaying);
  const keyframe = useAppSelector(state => state.timeline.keyframe);

  const debugElementsId = useMemo(() => {
    return getCheckedElementsId(debugElements);
  }, [debugElements]);

  const handlePlayingChange = useCallback((isPlaying: boolean) => {
    dispatch(changePlaying(isPlaying));
  }, [dispatch]);

  const handleKeyframeChange = useCallback((keyframe: number) => {
    dispatch(changeKeyframe(keyframe));
  }, [dispatch]);

  return (
    <div className="canvas-wrapper">
      <div id="canvas" className="canvas">
        <Interactable
          transform={transform}
          onMove={pos => dispatch(moveCanvas(pos))}
          onZoom={transform => dispatch(zoomCanvas(transform))}
          onReset={() => dispatch(resetTransform())}
        >
          {drawerData && <Svg
            data={drawerData as AnimationJSON}
            flat={flatCanvas}
            debugElements={debugElementsId}
            scale={transform.scale}
            displayTooltip={displayTooltip}
            playing={isPlaying}
            onPlayingChange={handlePlayingChange}
            keyframe={keyframe}
            onKeyframeChange={handleKeyframeChange}
          />}
        </Interactable>
      </div>
    </div>
  );
}
