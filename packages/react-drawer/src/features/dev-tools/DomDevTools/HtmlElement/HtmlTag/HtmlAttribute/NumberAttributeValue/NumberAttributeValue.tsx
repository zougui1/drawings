import React from 'react';

import { useStyles } from './NumberAttributeValue.styles';

export const NumberAttributeValue: React.FC<NumberAttributeValueProps> = ({ value }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      {value}
    </span>
  );
}

export interface NumberAttributeValueProps {
  value: string;
}
