import React from 'react';
import clsx from 'clsx';

import { useStyles } from './TabPanel.styles';

export const TabPanel: React.FC<TabPanelProps> = ({ className, panel, header, value, children }) => {
  const classes = useStyles();

  const show = panel === value;

  return (
    <div className={clsx(classes.root, className)} role="tabpanel" hidden={!show}>
      {show && (
        <>
          {header && (
            <div className={classes.header}>
              {header}
            </div>
          )}
          <div className={classes.content}>
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export interface TabPanelProps {
  className?: string;
  panel: string;
  header?: React.ReactChild;
  value: string;
}
