import { makeStyles } from 'react-core';

export const useStyles = makeStyles({
  root: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  },
  highlightTooltipRoot: {
    boxShadow: '1px 2px 3px 1px #0006',
  },
  highlightTooltip: {
    padding: '12px 8px',
    fontSize: '1rem',
    lineHeight: '1.15rem',
  },
  elementHighlight: {
    position: 'absolute',
    backgroundColor: '#66f6',
  },
  elementHighlightBorders: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    border: '1px dashed #33f',
  },
  verticalBorders: {
    borderTop: 0,
    borderBottom: 0,
  },
  horizontalBorders: {
    borderLeft: 0,
    borderRight: 0,
  },
});
