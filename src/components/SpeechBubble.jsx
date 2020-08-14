import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // float: 'left',
    marginBottom: 18,
    '& span': {
      minWidth: '150px',
      padding: '9px 12px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.1,
      display: 'inline-block',
      textTransform: 'uppercase',
      position: 'relative',
    },
    '& span:before': {
      content: '""',
      width: 0,
      height: 0,
      top: '100%',
      left: 5,
      display: 'block',
      position: 'absolute',
      borderStyle: 'solid',
      borderLeftColor: theme.palette.primary.main,
      borderWidth: '0 0 8px 8px',
      borderColor: 'transparent',
    },
  },
}));

export default function SpeechBubble(props) {
  const classes = useStyles();
  const { text } = props;
  return (
    <div className={classes.root}>
      <span>{text}</span>
    </div>
  );
}
