import { makeStyles } from '../../../../utils';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    boxSizing: 'border-box',
    width: '100%',
    maxHeight: 'calc(100% - 30px)',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    height: 35,
    borderBottom: '1px solid #444',
  },
  content: {
    boxSizing: 'border-box',
    paddingLeft: 8,
    paddingTop: 12,
    width: '100%',
    maxHeight: 'calc(100% - 35px)',
    overflowY: 'auto',

    '& > *': {
      paddingBottom: 12,
    },
  },
});
