import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > .MuiIcon-root': {
      display: 'block',
      margin: '0 auto 20px auto',
      color: theme.palette.secondary.main,
      fontSize: '5rem',
      width: 'auto',
      textAlign: 'center',
    },
  },
  name: {
    fontSize: 20,
    fontWeight: 400,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  // description: { textAlign: 'justify' },
}));

export default function Skill(props) {
  const classes = useStyles();
  const {
    iconClass = 'far fa-lightbulb',
    name = 'Skill',
    description = 'I am awesome.',
  } = props; // eslint-disable-line no-unused-vars

  return (
    <div className={classes.root}>
      <Icon className={iconClass} />
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.description}>{description}</Typography>
    </div>
  );
}
