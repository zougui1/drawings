import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { SlimMenu } from 'react-core';

import { useStyles } from './DomHeader.styles';
import { SettingsMenu } from './SettingsMenu';

export const DomHeader: React.FC = () => {
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(true);
  }

  const handleClose = () => {
    setShowMenu(false);
  }

  return (
    <div className={classes.root}>
      <IconButton className={classes.icon} onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      <SlimMenu open={showMenu} onClose={handleClose}>
        <SettingsMenu />
      </SlimMenu>
    </div>
  );
}
