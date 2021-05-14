import { makeStyles } from 'react-core';

export const useStyles = makeStyles({
  popper: {
    zIndex: 9999999,
    maxHeight: '100%',
    display: 'flex',
    width: 400,
  },
  tooltip: {
    padding: '8px 12px',
    width: '100%',
    maxWidth: 'unset',
    fontSize: '1.2rem',
    maxHeight: '100%',
    overflowY: 'auto'
  },
});
