import React from 'react';
import { Typography } from '@material-ui/core';

export const PanelSection: React.FC<PanelSectionProps> = ({ title, children }) => {
  return (
    <div className="panel-section">
      {title && <Typography variant="h4" className="panel-section-title">{title}</Typography>}

      <div className="panel-section-content">
        {children}
      </div>
    </div>
  );
}

export interface PanelSectionProps {
  title?: string;
}
