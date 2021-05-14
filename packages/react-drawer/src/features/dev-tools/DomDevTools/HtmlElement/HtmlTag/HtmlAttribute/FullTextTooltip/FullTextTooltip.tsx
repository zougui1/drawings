import React from 'react';
import { Tooltip } from '@material-ui/core';

import { useStyles } from './FullTextTooltip.styles';

export const FullTextTooltip: React.FC<FullTextTooltipProps> = ({ title, children }) => {
  const classes = useStyles();

  if (!title) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      title={<div>{title}</div>}
      classes={{ popper: classes.popper, tooltip: classes.tooltip }}
      interactive
    >
      <div>{children}</div>
    </Tooltip>
  );
}

export interface FullTextTooltipProps {
  title?: React.ReactChild | React.ReactChild[];
}
