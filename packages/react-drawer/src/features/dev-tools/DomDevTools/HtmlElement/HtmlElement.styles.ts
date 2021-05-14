import { makeStyles } from '../../../../utils';

const hoverBg = '#89c3';
const selectedBg = '#f5005730';
const selectedAndHoveredBg = '#e53a7030';

export const useStyles = makeStyles({
  root: {
    '&.selected.hover': {
      '& > $labelContainer': {
        backgroundColor: selectedAndHoveredBg,
      },
      '& > ul > * > * > * > .tag': {
        backgroundColor: selectedAndHoveredBg,
      },
    },

    '&.selected': {
      '& > $labelContainer': {
        backgroundColor: selectedBg,
      },
      '& > ul > * > * > * > .tag': {
        backgroundColor: selectedBg,
      },
      '& > ul > * > * > * > .content': {
        borderLeft: 'solid 1px #335fe3',
      },
    },

    '&.hover': {
      '& > $labelContainer': {
        backgroundColor: hoverBg,
      },
      '& > ul > * > * > * > .tag': {
        backgroundColor: hoverBg,
      },
    },
  },
  labelContainer: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginTop: 3,
    transform: 'scale(1.2)'
  },
  label: {
    backgroundColor: 'initial !important',
    marginLeft: '-5px !important',
    paddingLeft: 0,
    cursor: 'default',
  },
  contentWrapper: {
    display: 'inline-block',
    width: '100%',

    '& > .tag': {
      paddingLeft: '14px',
      marginLeft: '-14px',
    },
  },
  content: {
    borderLeft: 'solid 1px transparent',
    marginLeft: 4,
  },
  children: {
    marginLeft: 6,
  },
});
