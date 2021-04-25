import React from 'react';

import { CanvasSection } from './CanvasSection';
import { ReferencesSection } from './ReferencesSection';
import { DebugSection } from './DebugSection';

export const PanelWithData: React.FC = () => {
  return (
    <div className="drawing-panel">
      <CanvasSection />
      <ReferencesSection />
      <DebugSection />
    </div>
  );
}
