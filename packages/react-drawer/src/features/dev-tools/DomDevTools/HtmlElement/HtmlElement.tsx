import React, { useState } from 'react';
import clsx from 'clsx';
import { TreeItem } from '@material-ui/lab';
import { ContextMenu } from 'react-core';

import { useStyles } from './HtmlElement.styles';
import { HtmlElementContextMenu } from './HtmlElementContextMenu';
import { HtmlTag, HtmlTagVariant } from './HtmlTag';
import { DomNode } from '../../../../types';


export const HtmlElement: React.FC<HtmlElementProps> = ({ nodeId, onHover, onExpand, node, name, attributes, children, attributesIgnores }) => {
  const [tagHovered, setTagHovered] = useState(false);
  const classes = useStyles();

  const handleMouseEnter = () => {
    setTagHovered(true);
    const element = document.getElementById(nodeId);
    onHover?.(element, 'enter');
  }

  const handleMouseLeave = () => {
    setTagHovered(false);
    onHover?.(null, 'leave');
  }

  return (
    <ContextMenu contextMenu={<HtmlElementContextMenu node={node} />}>
      <TreeItem
        style={{ width: '100%' }}
        className={classes.root}
        classes={{
          root: clsx({ hover: tagHovered }),
          label: classes.label,
          selected: 'selected',
          content: classes.labelContainer,
          iconContainer: classes.iconContainer,
        }}
        nodeId={nodeId}
        onIconClick={() => onExpand(nodeId)}
        //contextMenu={<div style={{ color: '#000' }}></div>}
        contextMenu="context"
        label={
          <HtmlTag
            name={name}
            attributes={attributes}
            attributesIgnores={attributesIgnores}
            variant={children ? HtmlTagVariant.open : HtmlTagVariant.autoClose}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        }
        // prevent the item from expanding/collapsing when the label is clicked
        onLabelClick={e => e.preventDefault()}
      >
        {children && (
          <span className={classes.contentWrapper}>
            <div className={clsx('content', classes.content)}>
              <div className={classes.children}>{children}</div>
            </div>
            <HtmlTag
              name={name}
              className={clsx({ hover: tagHovered })}
              variant={HtmlTagVariant.close}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </span>
        )}
      </TreeItem>
    </ContextMenu>
  );
}

export interface HtmlElementProps {
  nodeId: string;
  name: string;
  node: DomNode;
  attributes: Record<string, React.ReactText | undefined | null>;
  attributesIgnores?: Record<string, string | number>;
  onHover?: (element: HTMLElement | null, type: 'enter' | 'leave') => void;
  onExpand: (nodeId: string) => void;
}
