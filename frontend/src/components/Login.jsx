import React from 'react';
import { Link } from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    margin: '0 auto',
  },

})

function Login(props) {

  const { classes } = props;

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12}>
            <Typography variant="display2">Who are you?</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary" component={Link} to ="chef">
            Chef
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="secondary" component={Link} to ="diners">
            Diner
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Login);