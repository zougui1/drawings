import { makeStyles } from '../../../../utils';

export const useStyles = makeStyles({
  keyPointTooltip: {
    fontSize: '1.3rem !important',
  },
  keyPoint: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    cursor: 'pointer',

    '&.active': {
      backgroundColor: '#f50057',
    },

    content: '""',
    marginTop: -7,
    width: 20,
    height: 20,
    backgroundColor: '#ccc',
    display: 'block',
    borderRadius: '50%',
  },
});
