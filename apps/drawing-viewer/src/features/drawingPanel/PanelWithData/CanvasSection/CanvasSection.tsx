import React from 'react';
import clsx from 'clsx';

import { PanelSection } from '../PanelSection';
import { useAppSelector } from '../../../../store';
import { MIN_SCALE, MAX_SCALE } from '../../../../constants';

export const CanvasSection: React.FC = () => {
  const x = useAppSelector(state => state.canvas.transform.x);
  const y = useAppSelector(state => state.canvas.transform.y);
  const scale = useAppSelector(state => state.canvas.transform.scale);

  const hasScaleReachedLimit = [MIN_SCALE, MAX_SCALE].some(threshold => threshold === scale);

  return (
    <PanelSection>
      <div className="canvas-position-container">
        <div>
          <span className="information-label">Scale:</span>
          <span className={clsx('information-value', { limited: hasScaleReachedLimit })}>
            {scale}
          </span>
        </div>

        <div>X: {Math.round(x)}</div>
        <div>Y: {Math.round(y)}</div>
      </div>
    </PanelSection>
  );
}
