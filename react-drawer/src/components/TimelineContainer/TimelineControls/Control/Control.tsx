import React from 'react';
import clsx from 'clsx';
import { IconButton, Tooltip } from '@material-ui/core';

import { useStyles } from './Control.styles';

export const Control: React.FC<ControlProps> = ({ tooltip, onClick, children }) => {
  const classes = useStyles();
  const disabled = !onClick;

  return (
    <Tooltip
      title={tooltip}
      classes={{ tooltip: classes.controlTooltip }}
      arrow
    >
      <span>
        <IconButton
          color="secondary"
          className={clsx(classes.controlButton, { disabled })}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export interface ControlProps {
  tooltip: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
