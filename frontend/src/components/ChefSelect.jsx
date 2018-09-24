import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import GenerateMealsButton from './GenerateMealsButton';
import ShowMeals from './ShowMeals';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
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

class ChefSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      meals: []
    }
  }

  generateMeals = () => {
    fetch(`${process.env.REACT_APP_API_URL}generate_meals`)
      .then(res => res.json())
      .then(data => this.setState(() => ({ meals: data.response }) ) );
  }

  currentMeals = () => {
    fetch(`${process.env.REACT_APP_API_URL}chef_meals`)
      .then(res => res.json())
      .then(data => this.setState(() => ({ meals: data.response }) ) );
  }

  render() {

    const { classes } = this.props;
    const { meals } = this.state;

    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
        <GenerateMealsButton
          generateMeals={this.generateMeals}
        />
        <ShowMeals meals={meals} />
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ChefSelect);