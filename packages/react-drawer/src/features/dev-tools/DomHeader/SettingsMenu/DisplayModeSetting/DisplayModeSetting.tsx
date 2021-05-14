import React, { useContext } from 'react';
import { Typography, Slider } from '@material-ui/core';
import { SimpleRadioGroup } from 'react-core';
import { AnimatorJSON } from 'drawer';

import { DrawingContext, DisplayMode, changeDisplayMode, changeKeyframeIndex } from '../../../../../context';

export const DisplayModeSetting: React.FC = () => {
  const [drawingContext, dispatch] = useContext(DrawingContext);
  const { dom } = drawingContext;
  const drawingData = drawingContext.drawingData as AnimatorJSON;

  const handleCheck = (e: React.ChangeEvent, newMode: string) => {
    dispatch(changeDisplayMode(newMode as DisplayMode))
  }

  const handleSlide = (e: React.ChangeEvent<{}>, value: number | number[]) => {
    const keyframeIndex = Array.isArray(value) ? value[0] : value;
    dispatch(changeKeyframeIndex(keyframeIndex));
  }

  return (
    <div>
      <Typography variant="h6">Display mode</Typography>

      <SimpleRadioGroup
        onChange={handleCheck}
        value={dom.display.mode}
        options={[
          { label: 'Standard', value: DisplayMode.standard },
          { label: 'Keyframe', value: DisplayMode.keyframe },
        ]}
      />

      {dom.display.mode === DisplayMode.keyframe && (
        <Slider
          onChange={handleSlide}
          min={1}
          max={drawingData.keyframes.length}
          value={dom.display.keyframeIndex + 1}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
      )}
    </div>
  );
}
