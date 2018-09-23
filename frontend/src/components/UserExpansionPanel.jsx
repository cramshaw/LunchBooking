import React from 'react';

import FoodCategoryCheckboxes from './FoodCategoryCheckboxes';

import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class UserExpansionPanel extends React.Component {

  handleChange = (event) => {
    this.props.handleChange(event, this.props.user.id)
  }

  render () {
    const { user, foodCategories } = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline">{ user.fullname }</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <FoodCategoryCheckboxes
            foodCategories={foodCategories}
            userId={user.id}
            preferences={user.food_preferences ? user.food_preferences.split(',') : []}
            handleChange={this.handleChange}
          />
          </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default UserExpansionPanel;