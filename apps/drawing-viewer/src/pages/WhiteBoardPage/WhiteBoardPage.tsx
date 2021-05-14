import React from 'react';
import { DrawingProvider } from 'react-drawer';

import { useUpdateSvg } from './useUpdateSvg';
import { Canvas } from '../../features/canvas';
import { DrawingPanel } from '../../features/drawingPanel';
import { Previews } from '../../features/previews';
import { Timeline } from '../../features/timeline';
import { ToolsPanel } from '../../features/toolsPanel';
import { useAppSelector } from '../../store';

export const WhiteBoardPage: React.FC = () => {
  useUpdateSvg();
  const drawerData = useAppSelector(state => state.drawer.data);

  return (
    <div className="whiteboard-container">
      {drawerData && (
        <DrawingProvider drawingData={drawerData}>
          <Previews />
          <DrawingPanel />
          <Canvas />
          <Timeline />
          <ToolsPanel />
        </DrawingProvider>
      )}
    </div>
  );
}
