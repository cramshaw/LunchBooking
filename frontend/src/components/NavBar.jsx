import React from 'react';

import { NavLink } from "react-router-dom";

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function NavBar(props) {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
            Lunch Booking
        </Typography>
        <Button
          color="inherit"
          component={NavLink}
          to="/"
          exact={true}
          activeStyle={{
            fontWeight: 'bold',
           }}>
          Home
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/chef"
          activeStyle={{
            fontWeight: 'bold',
           }}>
          Chef
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/diners"
          activeStyle={{
            fontWeight: 'bold',
           }}>
          Diners
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;