import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '@material-ui/core';

import { useStyles } from './KeyPoint.styles';

export const KeyPoint: React.FC<KeyPointProps> = ({ left, tooltip, active, onClick }) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={tooltip}
      classes={{ tooltip: classes.keyPointTooltip }}
      arrow
    >
      <div
        style={{ left: `${left}%` }}
        className={clsx(classes.keyPoint, { active })}
        onClick={onClick}
      />
    </Tooltip>
  );
}

export interface KeyPointProps {
  tooltip: string;
  left: number;
  active: boolean;
  onClick?: () => void;
}
