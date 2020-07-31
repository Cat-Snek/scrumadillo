import React from 'react';
import Board from './Board';
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { getLogin } from '../reducers/loginSlice';
import { assignUser, newState } from '../reducers/boardSlice';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: '#363738',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const Canvas = ({ logout, loggedIn, username }) => {
  if (!loggedIn) return <Redirect to="/login" />;

  // useEffect(() => {
  //   // // fetch request for user table
  //   // fetch(`/server/boardState/${username}`)
  //   //   .then((response) => response.json())
  //   //   .then(({ username, current, cards }) =>
  //   //     dispatch(newState({ username, current, cards }))
  //   //   );
  // });

  const { paper, heading } = useStyles();

  return (
  <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar logout={logout} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={paper}>
            <Typography className={heading}>To Do:</Typography>
            <Board id="stack" />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={paper}>
            <Typography className={heading}>In Progress:</Typography>
            <Board id="inProgress" />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={paper}>
            <Typography className={heading}>Completed:</Typography>
            <Board id="complete" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Canvas;
