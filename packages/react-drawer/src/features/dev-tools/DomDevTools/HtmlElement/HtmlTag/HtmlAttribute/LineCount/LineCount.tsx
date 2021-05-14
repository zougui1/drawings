import React from 'react';

import { useStyles } from './LineCount.styles';

export const LineCount: React.FC<LineCountProps> = ({ value }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      {value}
    </span>
  );
}

export interface LineCountProps {
  value: string;
}
