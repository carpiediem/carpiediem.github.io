import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AboutIcon from '@material-ui/icons/Help';
import SkillsIcon from '@material-ui/icons/Star';
import PortfolioIcon from '@material-ui/icons/PhotoLibrary';
import ExperienceIcon from '@material-ui/icons/Work';
import EducationIcon from '@material-ui/icons/School';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: 'white',
    color: 'black',
  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.light,
    fontFamily: "'Contrail One', cursive",
    textDecoration: 'none',
    '@media only screen and (max-width: 599px)': { marginBottom: -15 },
  },
  buttonGroup: {
    '& a': {
      borderColor: 'transparent !important',
      backgroundColor: 'transparent !important',
      color: 'inherit',
      fontSize: '13px',
      fontWeight: '700',
    },
    '& > a > span:after': {
      content: '""',
      position: 'absolute',
      left: 8,
      bottom: 4,
      width: 0,
      height: 3,
      borderRadius: 10,
      transition: 'width 0.2s ease-out',
      backgroundColor: theme.palette.primary.main,
    },
    '& > button:hover > span:after': { width: 'calc(100% - 16px)' },
  },
  scrolledTo: { '& > span:after': { width: 'calc(100% - 16px) !important' } },
  atTop: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    boxShadow: 'none',
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { section } = props;
  const narrow = window.innerWidth < 600;

  return (
    <div className={classes.root}>
      <AppBar
        color="transparent"
        className={section ? classes.appbar : classes.atTop}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            component="a"
            href="/"
            className={classes.title}
          >
            RSLC
          </Typography>
          <ButtonGroup
            variant="text"
            color="primary"
            disableRipple
            className={classes.buttonGroup}
          >
            <Button
              component="a"
              href="/#about"
              className={section === 'about' && classes.scrolledTo}
            >
              {narrow ? <AboutIcon /> : 'About'}
            </Button>
            <Button
              component="a"
              href="/#skills"
              className={section === 'skills' && classes.scrolledTo}
            >
              {narrow ? <SkillsIcon /> : 'Skills'}
            </Button>
            <Button
              component="a"
              href="/#portfolio"
              className={section === 'portfolio' && classes.scrolledTo}
            >
              {narrow ? <PortfolioIcon /> : 'Portfolio'}
            </Button>
            <Button
              component="a"
              href="/#experience"
              className={section === 'experience' && classes.scrolledTo}
            >
              {narrow ? <ExperienceIcon /> : 'Experience'}
            </Button>
            <Button
              component="a"
              href="/#education"
              className={section === 'education' && classes.scrolledTo}
            >
              {narrow ? <EducationIcon /> : 'Education'}
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}
