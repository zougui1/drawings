import React from 'react';
import clsx from 'clsx';

import { useStyles } from './HtmlTag.styles';
import { HtmlAttribute } from './HtmlAttribute';
import { Token, TokenVariant } from './Token';
import { parseHtmlAttributes, getIsMultilineHtmlTag } from '../../utils';

export enum HtmlTagVariant {
  open = 'open',
  close = 'close',
  autoClose = 'autoClose',
}

export const HtmlTag: React.FC<HtmlElementProps> = ({ name, attributes, attributesIgnores, variant, className, ...props }) => {
  const classes = useStyles();

  if (variant === HtmlTagVariant.close) {
    return (
      <span {...props} className={clsx('tag', classes.root, className)}>
        <Token variant={TokenVariant['<']} />
        <Token variant={TokenVariant['/']} />
        <span className={classes.elementName}>{name}</span>
        <Token variant={TokenVariant['>']} />
      </span>
    );
  }

  const _attributes = parseHtmlAttributes(attributes ?? {}, attributesIgnores ?? {});
  const isMultilineTag = getIsMultilineHtmlTag(_attributes);

  return (
    <span {...props} className={clsx('tag', classes.root, className)}>
      <Token variant={TokenVariant['<']} />
      <span className={classes.elementName}>{name}</span>

      {_attributes.map(({ name, value }) => (
        <React.Fragment key={name}>
          {isMultilineTag && <br />}
          <span className={clsx({ [classes.pathElementAttribute]: isMultilineTag })}>
            <HtmlAttribute name={name} value={value as React.ReactText} />
          </span>
        </React.Fragment>
      ))}

      {isMultilineTag && <br />}

      {variant === HtmlTagVariant.autoClose ? (
        <>
          <Token variant={TokenVariant[' ']} />
          <Token variant={TokenVariant['/']} />
          <Token variant={TokenVariant['>']} />
        </>
      ) : <Token variant={TokenVariant['>']} />}
    </span>
  );
}

export interface HtmlElementProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  name: string;
  variant?: HtmlTagVariant;
  attributes?: Record<string, React.ReactText | undefined | null>;
  attributesIgnores?: Record<string, string | number>;
}
