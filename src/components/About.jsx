/* global ga */

import React, { forwardRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import Introduction from './Introduction';

const ColorTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.primary.light,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    marginTop: 0,
  },
  arrow: { color: theme.palette.primary.light },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    padding: '0 15px',
    margin: 'auto',
  },
  background: {
    backgroundSize: 'cover',
    backgroundColor: '#242832',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(img/background.jpg)',
    filter: 'brightness(30%)',
    minHeight: 515,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: -2,
  },
  fadeToWhite: {
    minHeight: 515,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: -1,
    background: 'rgb(255,255,255)',
    // eslint-disable-next-line no-dupe-keys
    background:
      'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)',
  },
  card: {
    margin: '100px auto 0 auto',
    minWidth: 275,
    borderRadius: 0,
    border: 'none',
    '& a': { textDecoration: 'none', color: 'inherit' },
  },
  content: { padding: '30px 20px 15px 20px', textAlign: 'center' },
  photo: { maxWidth: '100%' },
  item: {
    width: 'inherit',
    color: 'rgb(61, 68, 81)',
    '& a': { outline: 'none' },
  },
  list: {
    '& li': {
      padding: '4px 0',
      '& span.MuiListItemText-primary': {
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
      },
      '& p.MuiListItemText-secondary': {
        color: '#9da0a7',
        fontSize: 15,
        fontWeight: 400,
        '& a': { color: 'inherit', textDecoration: 'none' },
      },
      '@media (min-width: 600px)': {
        '& p.MuiListItemText-secondary': {
          marginTop: -20,
          marginLeft: 100,
        },
      },
    },
  },
  actions: {
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
    '& a': {
      color: 'white',
      '& svg': { fill: 'white' },
    },
  },
  download: {
    color: 'rgb(61, 68, 81)',
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 30,
    padding: '15px 55px',
    '&:hover': {
      boxShadow:
        '0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)',
    },
  },
  hello: { color: 'black', fontSize: 20, fontWeight: 300 },
}));

export default forwardRef((props, ref) => {
  const classes = useStyles();

  const triggerDownloadEvent = () =>
    ga('send', 'event', 'File', 'Download', 'Resume');
  const triggerEmailEvent = () =>
    ga('send', 'event', 'Link', 'Click', 'Email Address');

  return (
    <React.Fragment>
      <section ref={ref} className={classes.root} data-testid="About">
        <Card className={classes.card} variant="outlined">
          <CardContent className={classes.content}>
            <Grid container spacing={3}>
              <Grid item sm={5} className={classes.item}>
                <a name="about" href="#about">
                  <img alt="" src="/img/ryan.jpg" className={classes.photo} />
                </a>
              </Grid>
              <Grid item sm={7} className={classes.item}>
                <Introduction
                  name={
                    <React.Fragment>
                      {/* <span className="thin">I'm </span> */}
                      Ryan{' '}
                      <ColorTooltip
                        arrow
                        title="Scott Luong"
                        placement="bottom"
                      >
                        <span>SL</span>
                      </ColorTooltip>{' '}
                      Carpenter
                    </React.Fragment>
                  }
                  role="Software Engineer & Entreprenuer"
                />
                <List className={classes.list}>
                  <ListItem>
                    <ListItemText
                      primary="Address"
                      secondary="Hong Kong"
                    ></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={
                        <a
                          href="mailto:ryan.sl.carpenter@gmail.com"
                          onClick={triggerEmailEvent}
                        >
                          ryan.sl.carpenter@gmail.com
                        </a>
                      }
                    ></ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.actions}>
            <IconButton
              aria-label="LinkedIn"
              component="a"
              href="https://www.linkedin.com/in/ryanscarpenter/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="GitHub"
              component="a"
              href="https://github.com/carpiediem/"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              aria-label="AngelList"
              component="a"
              href="https://angel.co/u/ryanslcarpenter"
              target="_blank"
            >
              <Icon className="fab fa-angellist" />
            </IconButton>
            <IconButton
              aria-label="Stack Overflow"
              component="a"
              href="https://stackoverflow.com/users/1811952/carpiediem?tab=profile"
              target="_blank"
            >
              <Icon className="fab fa-stack-overflow" />
            </IconButton>
          </CardActions>
          <CardContent className={classes.content}>
            <Button
              variant="outlined"
              size="large"
              component="a"
              href="/downloads/RyanSLCarpenter.pdf"
              className={classes.download}
              onClick={triggerDownloadEvent}
            >
              Download Resume
            </Button>
            {/* <Typography className={classes.hello}>
              Do I want an introductory paragraph here?
            </Typography> */}
          </CardContent>
        </Card>
      </section>
      <div className={classes.fadeToWhite}></div>
      <div className={classes.background}></div>
    </React.Fragment>
  );
});
