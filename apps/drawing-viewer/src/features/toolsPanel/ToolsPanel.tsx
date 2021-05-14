import React from 'react';
import { DrawingTools } from 'react-drawer';
import { Tab } from 'react-core';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';

import './ToolsPanel.css';
import { PreviewsTab } from './PreviewsTab';

export const ToolsPanel: React.FC = () => {
  return (
    <DrawingTools className="tools-panel">
      <Tab
        value="previews"
        tab={{
          icon: <PhotoSizeSelectLargeIcon />,
          label: 'Previews',
        }}
      >
        <PreviewsTab />
      </Tab>
    </DrawingTools>
  );
}
