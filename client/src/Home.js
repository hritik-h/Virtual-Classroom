import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './components/images/memories.png';
import './button.css';

const Home = () => {
  
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  if (!localStorage.getItem('_id')) {
    console.log("User not Logged In");
    return (<Redirect to='/login' />)
}
  const logout = () =>{
    console.log("User not Logged In");
    localStorage.clear();
  }
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Tasks</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        <NavLink to='/login' > <Button className='logout-button' variant="contained" color="secondary" size="small" onClick={logout} > Logout </Button></NavLink>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;