import React, { useState, useRef } from 'react';

import './Interactable.css';
import { MIN_SCALE, MAX_SCALE } from '../../constants';
import { matrixScale, zoom } from '../../utils';
import { useKeyPressCatcher, useFactor } from '../../hooks';

export const Interactable: React.FC<InteractableProps> = ({ transform, onMove, onZoom, onReset, children }) => {
  const [startDown, setStartDown] = useState<any>({ x: 0, y: 0, e: null });
  const getFactor = useFactor();
  const interactableWrapper = useRef<HTMLDivElement | null>(null);

  const { scale, x, y } = transform;

  useKeyPressCatcher(undefined, (keyPressHandler) => {
    keyPressHandler.onDown(['Control', ' '], () => {
      onReset();
    });
  });

  const handleWheel = (e: React.WheelEvent) => {
    const scaleData = {
      factor: getFactor(),
      minScale: MIN_SCALE,
      maxScale: MAX_SCALE,
    };

    if (!interactableWrapper.current) {
      return;
    }

    onZoom(zoom(e, transform, interactableWrapper.current, scaleData));
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartDown({ x, y, e });
  }

  const handleMouseUp = () => {
    setStartDown({ x: 0, y: 0, e: null });
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!startDown.e) {
      return;
    }

    onMove({
      x: startDown.x + e.pageX - startDown.e.clientX,
      y: startDown.y + e.pageY - startDown.e.clientY,
    });
  }

  return (
    <div
      className="interactable-container"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="interactable-wrapper"
        ref={interactableWrapper}
        style={{ transform: matrixScale(scale, x, y) }}
      >
       {children}
      </div>
    </div>
  );
}

type Transform = {
  scale: number,
  x: number,
  y: number,
};

type InteractableProps = {
  transform: Transform;
  onMove: (position: { x: number, y: number }) => void;
  onZoom: (transform: { x: number, y: number, scale: number }) => void;
  onReset: () => void;
}
