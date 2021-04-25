import React from 'react';

import './DrawingPanel.css';
import { PanelWithData } from './PanelWithData';
import { PanelWithoutData } from './PanelWithoutData';
import { useAppSelector } from '../../store';

export const DrawingPanel: React.FC = () => {
  const drawerData = useAppSelector(state => state.drawer.data);

  return drawerData
    ? <PanelWithData />
    : <PanelWithoutData />;
}
