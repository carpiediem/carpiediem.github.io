import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
// import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'row-reverse',
    '&.right': {
      flexDirection: 'row',
      '& .MuiPaper-root span:first-child': {
        right: 'auto',
        left: -12,
        backgroundPosition: '0 0',
        '&:before': {
          width: 0,
          height: 0,
          content: '""',
          display: 'block',
          marginLeft: 2,
          borderLeft: 'none',
          borderTop: '20px solid transparent',
          borderBottom: '20px solid transparent',
          borderRight: '10px solid #fff',
        },
      },
    },
    '& .MuiTimelineItem-content': { zIndex: 2 },
    '@media only screen and (max-width: 599px)': {
      top: 'auto !important',
      marginBottom: 15,
      '& .MuiTimelineSeparator-root': { display: 'none' },
      '&:before': { display: 'none' },
      '& .MuiPaper-root span:first-child': { display: 'none' },
    },
    '&.color-secondary': {
      '& .MuiPaper-root': { borderColor: theme.palette.secondary.main },
      '& h3': { color: theme.palette.secondary.light },
    },
  },
  dot: { zIndex: 2 },
  paper: {
    position: 'relative',
    padding: 20,
    textAlign: 'left',
    borderTop: 'thick solid',
    borderColor: theme.palette.primary.main,
  },
  arrow: {
    right: -12,
    backgroundImage: 'url(img/arrows.png)',
    backgroundPosition: '-18px 0',
    top: 'calc(50% - 22px)',
    width: 12,
    height: 41,
    marginBottom: -41,
    display: 'block',
    position: 'absolute',
    '&:before': {
      width: 0,
      height: 0,
      content: '""',
      display: 'block',
      marginRight: 2,
      borderTop: '20px solid transparent',
      borderBottom: '20px solid transparent',
      borderLeft: '10px solid #fff',
    },
  },
  years: {
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 700,
    color: theme.palette.primary.light,
  },
  degree: { fontSize: 22, fontWeight: 400, marginTop: 5, marginBottom: 20 },
  school: { color: 'rgb(135, 135, 135)', textDecoration: 'none' },
}));

export default function School(props) {
  const classes = useStyles();
  const {
    years = 'THEN - NOW',
    school = 'School of Hard Knocks',
    url = 'https://en.wikipedia.org/wiki/School_of_Hard_Knocks',
    degree = 'Doctor of Knockology',
    color,
    offset,
    side,
  } = props;

  return (
    <TimelineItem
      className={`${classes.root} ${side} color-${color || 'primary'}`}
      style={{ top: offset }}
    >
      <TimelineSeparator>
        <TimelineConnector className={classes.topConnector} />
        <TimelineDot color={color || 'primary'} className={classes.dot} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <span className={classes.arrow}></span>
          <Typography variant="h6" component="h3" className={classes.years}>
            {years}
          </Typography>
          <Typography variant="body1" className={classes.degree}>
            {degree}
          </Typography>
          <Typography
            variant="overline"
            display="block"
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.school}
          >
            {school}
          </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
