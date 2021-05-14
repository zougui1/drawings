import React from 'react';

import { CanvasSection } from './CanvasSection';

export const PanelWithData: React.FC = () => {
  return (
    <div className="drawing-panel">
      <CanvasSection />
    </div>
  );
}
