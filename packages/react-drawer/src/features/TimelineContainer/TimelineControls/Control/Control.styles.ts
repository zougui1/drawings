import { makeStyles } from '../../../../utils';

export const useStyles = makeStyles({
  controlButton: {
    color: '#eee',

    '&.disabled': {
      color: '#eee4',
    },
  },
  controlTooltip: {
    fontSize: '1.3rem',
  },
});
