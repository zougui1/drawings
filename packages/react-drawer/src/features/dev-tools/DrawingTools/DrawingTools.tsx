import React, { useState } from 'react';
import clsx from 'clsx';
import CodeIcon from '@material-ui/icons/Code';
import { Tabs, Tab } from 'react-core';

import { useStyles } from './DrawingTools.styles';
import { Panels } from './Panels';
import { DomDevTools } from '../DomDevTools';
import { DomHeader } from '../DomHeader';
import { Resizer } from '../../../components/Resizer';
import { StandardHighlight } from '../../Debug/StandardHighlight';

export const DrawingTools: React.FC<DrawingToolsProps> = ({ className, children }) => {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = useState(Panels.dom);

  const handlePanelChange = (event: React.ChangeEvent<{}>, newPanel: Panels): void => {
    setCurrentPanel(newPanel);
  }

  return (
    <>
      <Resizer defaultWidth={694} className={clsx(classes.root, className)}>
        <div className={classes.container}>
          <Tabs className={classes.tabs} value={currentPanel} onChange={handlePanelChange}>
            <Tab
              value={Panels.dom}
              tab={{
                icon: <CodeIcon />,
                label: 'DOM',
              }}
              header={<DomHeader />}
            >
              <DomDevTools />
            </Tab>

            {children}
          </Tabs>
        </div>
      </Resizer>
      <StandardHighlight />
    </>
  );
}

export interface DrawingToolsProps {
  className?: string;
}
