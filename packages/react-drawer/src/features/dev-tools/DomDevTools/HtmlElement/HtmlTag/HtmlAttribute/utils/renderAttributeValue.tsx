import React from 'react';

import { NumberAttributeValue } from '../NumberAttributeValue';
import { StringAttributeValue } from '../StringAttributeValue';
import { ColorAttributeValue } from '../ColorAttributeValue';
import { LineCount } from '../LineCount';
import { renderText } from '../../../../../../../utils';

const colorAttributesName = ['stroke', 'fill'];

const renderColorAttribute = (value: string): React.ReactChild => {
  return <ColorAttributeValue value={value} />;
}

const defaultRender = (value: string): React.ReactChild[] => {
  return renderText(value, {
    keywords: {
      ' ': () => <>&nbsp;</>,
      '\n': () => <br />,
    },
    renderNumber: number => <NumberAttributeValue value={number} />,
    renderString: string => <StringAttributeValue value={string} />,
    patterns: [
      {
        pattern: /\s*[0-9]+:/,
        render: string => <LineCount value={string} />,
      },
    ],
  });
}

export const renderAttributeValue = (attrName: string, attrValue: string): React.ReactChild | React.ReactChild[] => {
  return colorAttributesName.includes(attrName)
    ? renderColorAttribute(attrValue)
    : defaultRender(attrValue);
}

export const formatCodeBlock = (text: string): string => {
  const lines = text.split('\n');
  const lineCount = lines.length;
  const lastLineCountLength = lineCount.toString().length;

  const linesWithCount = lines.map((line, i) => {
    const currentLineCount = i + 1;
    const marginCount = lastLineCountLength - currentLineCount.toString().length;
    const margin = ' '.repeat(marginCount);
    const currentCount = `${margin}${currentLineCount}:`;

    return `${currentCount} ${line}`;
  });

  return linesWithCount.join('\n');
}
