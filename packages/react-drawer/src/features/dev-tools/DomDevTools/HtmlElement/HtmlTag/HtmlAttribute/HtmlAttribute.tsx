import React from 'react';

import { useStyles } from './HtmlAttribute.styles';
import { FullTextTooltip } from './FullTextTooltip';
import { renderAttributeValue, formatCodeBlock } from './utils';
import { Token, TokenVariant } from '../Token';
import { trimAttributeValue, isMultilineAttributeValue } from '../../../utils';

export const HtmlAttribute: React.FC<HtmlAttributeProps> = ({ name, value }) => {
  const classes = useStyles();
  const cleanValue = trimAttributeValue(value);
  const isMultiline = isMultilineAttributeValue(value);
  const valueElements = renderAttributeValue(name, cleanValue);

  const isTruncated = value.toString().length !== cleanValue.length;
  const title = isTruncated ? renderAttributeValue(name, formatCodeBlock(value.toString())) : undefined;

  return (
    <>
      <Token variant={TokenVariant[' ']} />
      <span>
        <span className={classes.attributeName}>{name}</span>
        <Token variant={TokenVariant['=']} />
        <span className={classes.attributeValue}>"
          <FullTextTooltip title={title}>
            {isMultiline ? (
              <FullTextTooltip title={title}>
                <div className={classes.multilineWrapper}>{valueElements}</div>
              </FullTextTooltip>
            ) : valueElements
            }
          </FullTextTooltip>
          "
        </span>
      </span>
    </>
  );
}

export interface HtmlAttributeProps {
  name: string;
  value: React.ReactText;
}
