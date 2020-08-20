import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// import SpeechBubble from './SpeechBubble';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 15,
    borderBottom: 'thin solid #ddd',
    textAlign: 'left',
    '@media (max-width: 599px)': {
      textAlign: 'center',
    },
  },
  name: {
    fontWeight: 700,
    '& > span.thin': { fontWeight: 300 },
  },
  role: { fontWeight: 400 },
}));

export default function Introduction(props) {
  const classes = useStyles();
  const {
    // bubble = 'Hey, there',
    name = 'John Smith',
    role = 'Human Person',
  } = props;

  return (
    <div className={classes.root}>
      {/* <SpeechBubble text={bubble} /> */}
      <Typography variant="h4" component="h1" className={classes.name}>
        {name}
      </Typography>
      <Typography variant="h6" component="h2" className={classes.role}>
        {role}
      </Typography>
    </div>
  );
}
