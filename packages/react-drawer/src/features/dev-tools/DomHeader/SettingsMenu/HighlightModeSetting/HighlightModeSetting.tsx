import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { SimpleRadioGroup } from 'react-core';

import { DrawingContext, HighlightMode, changeHighlightMode } from '../../../../../context';

export const HighlightModeSetting: React.FC = () => {
  const [drawingContext, dispatch] = useContext(DrawingContext);
  const { dom } = drawingContext;

  const handleChange = (e: React.ChangeEvent, newMode: string) => {
    dispatch(changeHighlightMode(newMode as HighlightMode))
  }

  return (
    <div>
      <Typography variant="h6">Highlight mode</Typography>

      <SimpleRadioGroup
        onChange={handleChange}
        value={dom.highlight.mode}
        options={[
          { label: 'Standard', value: HighlightMode.standard },
          { label: 'Path', value: HighlightMode.path },
          { label: 'None', value: HighlightMode.none },
        ]}
      />
    </div>
  );
}
