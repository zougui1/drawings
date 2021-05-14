import React from 'react';
import { ClickAwayListener, Paper, MenuList } from '@material-ui/core';

import { useStyles } from './SlimMenu.styles';

export const SlimMenu: React.FC<SlimMenuProps> = ({ open, onClose, className, children }) => {
  const classes = useStyles();

  if (!open) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Paper className={classes.menuContainer}>
        <MenuList className={className}>
          {children}
        </MenuList>
      </Paper>
    </ClickAwayListener>
  );
}

export interface SlimMenuProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}
