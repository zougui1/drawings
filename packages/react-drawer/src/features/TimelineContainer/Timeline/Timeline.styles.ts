import { makeStyles } from '../../../utils';

export const useStyles = makeStyles({
  root: {
    position: 'absolute',
    zIndex: 9999999,
    left: 0,
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#333',
    boxShadow: '0 0 5px 2px #0006',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    boxSizing: 'border-box',
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  slider: {
    width: '95%',
  },
});
