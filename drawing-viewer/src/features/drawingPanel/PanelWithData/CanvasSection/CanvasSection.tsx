import React from 'react';
import clsx from 'clsx';
import { FormGroup } from '@material-ui/core';

import { PanelSection } from '../PanelSection';
import { changeFlat } from '../../../canvas';
import { Switch } from '../../../../components/Switch';
import { changeCanvasViewSize } from '../../../previews';
import { SizePicker } from '../../../../components/SizePicker';
import { useAppSelector, useAppDispatch } from '../../../../store';
import { MIN_SCALE, MAX_SCALE } from '../../../../constants';

export const CanvasSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const x = useAppSelector(state => state.canvas.transform.x);
  const y = useAppSelector(state => state.canvas.transform.y);
  const scale = useAppSelector(state => state.canvas.transform.scale);
  const flat = useAppSelector(state => state.canvas.flat);

  const canvasPreview = useAppSelector(state => state.previews.canvasViewSize);

  const hasScaleReachedLimit = [MIN_SCALE, MAX_SCALE].some(threshold => threshold === scale);

  return (
    <PanelSection title="Canvas">
      <div>
        <span className="information-label">Scale:</span>
        <span className={clsx('information-value', { limited: hasScaleReachedLimit })}>
          {scale}
        </span>
      </div>

      <div>X: {Math.round(x)}</div>
      <div>Y: {Math.round(y)}</div>

      {/*<FormGroup row>
        <Switch label="Flat" checked={flat} onChange={() => dispatch(changeFlat())} />
      </FormGroup>*/}

      <SizePicker
        label="Preview size"
        value={canvasPreview}
        onChange={newSize => dispatch(changeCanvasViewSize(newSize))}
      />
    </PanelSection>
  );
}
