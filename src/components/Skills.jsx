import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Skill from './Skill';
import skills from '../content/skills.json';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    padding: '0 15px',
    margin: 'auto',
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
  item: {
    width: 'inherit',
    color: 'rgb(61, 68, 81)',
  },
}));

export default forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <section ref={ref} className={classes.root} data-testid="Skills">
      <Typography variant="h4" component="h2" className={classes.h2}>
        <a name="skills" href="#skills">
          Skills
        </a>
      </Typography>
      <Grid container spacing={5}>
        {skills.map((skill) => (
          <Grid key={skill.name} item sm={4} className={classes.item}>
            <Skill {...skill} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
});
