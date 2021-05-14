import React from 'react';
import clsx from 'clsx';

import { useStyles } from './ColorAttributeValue.styles';

const invisibleColors = ['none', 'transparent'];

export const ColorAttributeValue: React.FC<ColorAttributeValueProps> = ({ value }) => {
  const classes = useStyles();
  const hasColor = value && !invisibleColors.includes(value)

  return (
    <span
      className={clsx(classes.root, { [classes.hasColor]: hasColor })}
      style={{ borderColor: hasColor ? value : undefined }}
    >
      {value}
    </span>
  );
}

export interface ColorAttributeValueProps {
  value: string;
}
