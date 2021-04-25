import React from 'react';

import { useUpdateSvg } from './useUpdateSvg';
import { Canvas } from '../../features/canvas';
import { DrawingPanel } from '../../features/drawingPanel';
import { Previews } from '../../features/previews';
import { Timeline } from '../../features/timeline';

export const WhiteBoardPage: React.FC = () => {
  useUpdateSvg();
  return (
    <div className="whiteboard-container">
      <Previews />
      <DrawingPanel />
      <Canvas />
      <Timeline />
    </div>
  );
}
