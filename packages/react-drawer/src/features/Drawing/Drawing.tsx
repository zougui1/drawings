import React, { memo, useState, useContext } from 'react';
import { SegmentData } from 'drawer';

import { Svg } from '../Svg';
import { DebugTooltip } from '../Debug/DebugTooltip';
import { StandardHighlight } from '../Debug/StandardHighlight';
import { DrawingContext } from '../../context';

const DrawingNaked: React.FC<DrawingProps> = ({ scale, ...svgProps }) => {
  const [segment, setSegment] = useState<SegmentData | undefined>();
  const [drawingContext] = useContext(DrawingContext);

  return (
    <>
      <Svg
        {...svgProps}
        segment={segment}
        setSegment={setSegment}
      />

      {drawingContext.debug.showTooltip && segment && <DebugTooltip
        segment={segment}
        scale={scale}
      />}
    </>
  );
}

export interface DrawingProps {
  scale?: number;
}

export const Drawing = memo(DrawingNaked);
