import React from 'react';

import { useStyles } from './SettingsMenu.styles';
import { HighlightModeSetting } from './HighlightModeSetting';
import { DisplayModeSetting } from './DisplayModeSetting';
import { DisplayTooltipSetting } from './DisplayTooltipSetting';
import { ShowForAnimator } from '../../../../components/ShowForAnimator';

export const SettingsMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <div className={classes.section}>
        <HighlightModeSetting />
      </div>

      <ShowForAnimator>
        <div className={classes.section}>
          <DisplayModeSetting />
        </div>
      </ShowForAnimator>

      <div className={classes.section}>
        <DisplayTooltipSetting />
      </div>
    </div>
  );
}
