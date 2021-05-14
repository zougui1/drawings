import { makeStyles } from '../../utils';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  resizeHandle: {
    height: '100%',
    width: 2,
    //borderRight: '1px solid #f00',
    cursor: 'ew-resize',
  },
});
