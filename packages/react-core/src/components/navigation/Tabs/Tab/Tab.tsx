import React from 'react';
import { Tab as MuiTab, Typography } from '@material-ui/core';

import { useStyles } from './Tab.styles';

export const Tab: React.FC<TabProps> = ({ label, icon, value, ...props }) => {
  const classes = useStyles();

  return (
    <MuiTab
      {...props}
      className={classes.root}
      label={(
        <div className={classes.labelContainer}>
          {icon && (
            <div className={classes.iconContainer}>{icon}</div>
          )}
          <Typography>{label}</Typography>
        </div>
      )}
      value={value}
    />
  );
}

export interface TabProps {
  label: string;
  value: string;
  icon?: React.ReactChild;
}
