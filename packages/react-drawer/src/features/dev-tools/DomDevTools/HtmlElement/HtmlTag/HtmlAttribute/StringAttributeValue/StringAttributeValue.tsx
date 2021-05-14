import React from 'react';

import { useStyles } from './StringAttributeValue.styles';

export const StringAttributeValue: React.FC<StringAttributeValueProps> = ({ value }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      {value}
    </span>
  );
}

export interface StringAttributeValueProps {
  value: string;
}
