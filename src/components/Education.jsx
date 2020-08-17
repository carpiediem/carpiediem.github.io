import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import Typography from '@material-ui/core/Typography';

import School from './School';
import schools from '../content/schools.json';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    padding: '0 15px',
    margin: 'auto',
    marginBottom: -400,
  },
  h2: {
    color: 'rgb(61, 68, 81)',
    fontSize: '1.88rem',
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 30,
    '& a': { textDecoration: 'none', color: 'inherit' },
  },
}));

export default forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <section ref={ref} className={classes.root} data-testid="Education">
      <Typography variant="h4" component="h2" className={classes.h2}>
        <a name="education" href="#education">
          Education
        </a>
      </Typography>

      <Timeline align="alternate">
        {schools.map((school) => (
          <School key={school.years} {...school} />
        ))}
      </Timeline>
    </section>
  );
});
