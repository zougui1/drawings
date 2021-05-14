import React, { useContext } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

import { DrawingContext, toogleTooltip } from '../../../../../context';

export const DisplayTooltipSetting: React.FC = () => {
  const [drawingContext, dispatch] = useContext(DrawingContext);

  const handleCheck = () => {
    dispatch(toogleTooltip());
  }

  return (
    <div>
      <FormControlLabel
        control={<Switch />}
        label="Display tooltip"
        checked={drawingContext.debug.showTooltip}
        onChange={handleCheck}
      />
    </div>
  );
}
