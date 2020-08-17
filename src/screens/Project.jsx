import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import NavBar from '../components/NavBar';
import projects from '../content/projects.json';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 'calc(100vh - 50px)',
    paddingTop: 50,
  },
  paper: {
    width: 1200,
    maxWidth: 'calc(100% - 80px)',
    padding: 25,
    margin: 'auto',
  },
  img: { maxWidth: '100%' },
  title: { fontSize: 30, fontWeight: 700 },
  content: {
    color: '#666',
    '& a': { color: theme.palette.primary.light, textDecoration: 'none' },
  },
}));

export default function Project() {
  const classes = useStyles();
  const { id } = useParams();
  const [scrolled, setScrolled] = useState(false);

  const summary = projects.find((p) => p.id === id);
  let content = '<p>TBD</p>';

  try {
    content = require(`../content/${id}.html`);
  } catch (err) {
    console.error(err);
  }

  useEffect(() => {
    const listener = debounce(() => {
      setScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  });

  return (
    <div className={classes.root}>
      <NavBar section={scrolled && 'not top'} />
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item sm={6} className={classes.item}>
            <img
              alt={summary.title}
              src={summary.img}
              className={classes.img}
            />
          </Grid>
          <Grid item sm={6} className={classes.item}>
            <Typography variant="h4" component="h1" className={classes.title}>
              {summary.title}
            </Typography>
            <section
              dangerouslySetInnerHTML={{ __html: content }}
              className={classes.content}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
