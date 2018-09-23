import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ShowMeals(props) {

  const { meals } = props;

  return (
    <List>
    {
      meals.map( meal => {
        return (
          <ListItem>
            <ListItemText
              primary={meal.name}
            />
          </ListItem>
        )
      })
    }
    </List>
  )
}

export default ShowMeals;