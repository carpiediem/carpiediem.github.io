import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import ZoomIcon from '@material-ui/icons/ZoomIn';
import LinkIcon from '@material-ui/icons/Link';
import GitHubIcon from '@material-ui/icons/GitHub';

// import Skill from './Skill';
import projects from '../content/projects.json';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    padding: '0 15px',
    margin: 'auto',
    marginBottom: 100,
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
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  tile: {
    '& .MuiGridListTileBar-titleWrap': {
      marginTop: 175,
      transition: 'all 0.25s ease-out',
    },
    '&:hover .MuiGridListTileBar-titleWrap': {
      marginTop: 0,
    },
  },
  tileBar: {
    transform: 'translate(0, 55px)',
    background:
      'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.65) 100%)',
    height: '75%',
    bottom: 55,
    fontSize: 13,
    fontWeight: 400,
    '& h3': {
      color: 'white',
      fontSize: 18,
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    '& div.tags span': {
      color: 'rgba(255, 255, 255, 0.5)',
      textTransform: 'uppercase',
    },
    '& div.actions': {
      marginTop: 20,
      '& a.MuiButton-root': {
        padding: 10,
        margin: '0 5px',
        color: theme.palette.primary.light,
        borderColor: 'white',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
        '& svg': { fontSize: '1.8rem' },
      },
    },
  },
  icon: {
    color: 'white',
  },
}));

export default forwardRef((props, ref) => {
  const classes = useStyles();

  const scrollUp = () => window.scrollTo(0, 0);

  return (
    <section ref={ref} className={classes.root} data-testid="Portfolio">
      <Typography variant="h4" component="h2" className={classes.h2}>
        <a name="portfolio" href="#portfolio">
          {' '}
          Portfolio
        </a>
      </Typography>
      <GridList cellHeight={300} spacing={15} className={classes.gridList}>
        {projects.map((tile) => (
          <GridListTile
            key={tile.img}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
            component="article"
            className={classes.tile}
          >
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={
                <React.Fragment>
                  <h3>{tile.title}</h3>
                  <div className="tags">
                    {tile.tags && tile.tags.length ? (
                      tile.tags.sort().map((tag, i) => (
                        <span key={tag}>
                          {i ? ', ' : ''}
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                  <div className="actions">
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/projects/${tile.id}`}
                      onClick={scrollUp}
                    >
                      <ZoomIcon />
                    </Button>
                    {tile.demo && (
                      <Button
                        variant="outlined"
                        component="a"
                        href={tile.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon />
                      </Button>
                    )}
                    {tile.github && (
                      <Button
                        variant="outlined"
                        component="a"
                        href={tile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon />
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              }
              className={classes.tileBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </section>
  );
});
