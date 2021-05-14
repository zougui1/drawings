import React from 'react';

import { useStyles } from './Token.styles';

export enum TokenVariant {
  '<' = '<',
  '>' = '>',
  '=' = '=',
  '/' = '/',
  ' ' = ' ',
}

export const Token: React.FC<TokenProps> = ({ variant }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      {variant}
    </span>
  );
}

export interface TokenProps {
  variant: TokenVariant;
}
