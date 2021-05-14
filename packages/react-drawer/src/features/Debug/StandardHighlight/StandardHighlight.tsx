import React, { useContext } from 'react';
import clsx from 'clsx';
import { Tooltip } from '@material-ui/core';

import { useStyles } from './StandardHighlight.styles';
import { DrawingContext } from '../../../context';

export const StandardHighlight: React.FC = () => {
  const classes = useStyles();
  const [drawingContext] = useContext(DrawingContext);
  const { dom } = drawingContext;

  if (!dom.highlight.standard) {
    return null;
  }
  return (
    <div className={classes.root}>
      {dom.highlight.standard && (
        <>
          <Tooltip
            classes={{ tooltip: classes.highlightTooltipRoot }}
            open
            title={
              <div className={classes.highlightTooltip}>
                <div>
                  Size: {dom.highlight.standard.width.toFixed(2)}, {dom.highlight.standard.height.toFixed(2)}
                </div>
                <div>
                  Position: {dom.highlight.standard.left.toFixed(2)}, {dom.highlight.standard.top.toFixed(2)}
                </div>
              </div>
            }
          >
            <div
              className={classes.elementHighlight}
              style={{
                left: dom.highlight.standard.left,
                top: dom.highlight.standard.top,
                width: dom.highlight.standard.width,
                height: dom.highlight.standard.height,
              }}
            />
          </Tooltip>

          <div
            className={clsx(classes.elementHighlightBorders, classes.verticalBorders)}
            style={{
              left: dom.highlight.standard.left,
              width: dom.highlight.standard.width,
            }}
          />
          <div
            className={clsx(classes.elementHighlightBorders, classes.horizontalBorders)}
            style={{
              top: dom.highlight.standard.top,
              height: dom.highlight.standard.height,
            }}
          />
        </>
      )}
    </div>
  );
}
