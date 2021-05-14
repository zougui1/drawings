import { makeStyles } from '../../../utils';

export const useStyles = makeStyles({
  root: {
    position: 'absolute',
    color: '#fff',
    zIndex: 999999,
    top: 0,
    right: 0,
    backgroundColor: '#14171a',
    // -100px which is the timeline's height
    height: 'calc(100vh - 100px)',
    boxSizing: 'border-box',
    boxShadow: '0 0 5px 2px #0006',
  },
  container: {
    width: '100%',
    userSelect: 'none',
  },
  tabs: {
    height: 30,
    minHeight: 30,
  },
});
