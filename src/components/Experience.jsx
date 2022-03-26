import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import Typography from '@material-ui/core/Typography';

import Job from './Job';
import jobs from '../content/jobs.json';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    padding: '0 15px',
    margin: 'auto',
    '@media only screen and (min-width: 600px)': { marginBottom: -980 },
  },
  h2: {
    color: 'rgb(61, 68, 81)',
    // outline: 'none',
    fontSize: '1.88rem',
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    '& a': {
      paddingTop: 50,
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none',
    },
  },
}));

export default forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <section ref={ref} className={classes.root} data-testid="Experience">
      <Typography variant="h4" component="h2" className={classes.h2}>
        <a name="experience" href="#experience">
          Work Experience
        </a>
      </Typography>

      <Timeline align="alternate">
        {jobs.map((job) => (
          <Job key={job.years} {...job} />
        ))}
      </Timeline>
    </section>
  );
});
