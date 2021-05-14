import { makeStyles } from '../../../utils';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 4,
    //backgroundColor: '#fff',
  },
  timelineItems: {
    //marginTop: 12,
    marginTop: -19,
    display: 'flex',
    position: 'relative',
  },
  sliderRail: {
    height: 6,
  },
  sliderThumb: {
    //marginTop: -2,
    //width: 16,
    //height: 16,
    marginTop: -12,
    width: 4,
    height: 30,
    borderRadius: 0,
    transform: 'translateX(6px)',
  },
});
