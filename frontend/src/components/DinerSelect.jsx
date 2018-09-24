import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserExpansionPanel from './UserExpansionPanel';

class DinerSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      foodCategories: []
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}diners`)
      .then(res => res.json())
      .then(data => this.setState(() => ({ users: data.response }) ) );
    fetch(`${process.env.REACT_APP_API_URL}food_categories`)
      .then(res => res.json())
      .then(data => this.setState(() => ({ foodCategories: data.response }) ) );
  }

  // fetchUserPreferences = (userId) => {
  //   fetch(`http://localhost:4000/api/diner_preferences/${userId}`)
  //     .then(res => res.json())
  //     .then(data => this.setState(() => ({ preferences: data.response }) ) );

  addUserPreference = (userId, foodCategory) => {
    // Optimistic update
    this.setState( (state) => {
      return {
        users: state.users.map( user =>
          user.id === userId ? {...user, food_preferences: [...user.food_preferences, foodCategory]}
          : user
        )
      }
    })
    // Make the request
    fetch(`http://localhost:4000/api/diner_preferences/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          food_category: foodCategory
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.response.affectedRows === 0) {
          // Rollback the change
          console.log(data)
        }
      })
  }

  removeUserPreference = (userId, foodCategory) => {
    this.setState( (state) => {
      return {
        users: state.users.map( user => {
          return user.id === userId ? {
            ...user,
            food_preferences:
              [...user.food_preferences.slice(0, user.food_preferences.indexOf(foodCategory) ),
              ...user.food_preferences.slice(user.food_preferences.indexOf(foodCategory) + 1 )]
          }
          : user
        })
      }
    })
    fetch(`http://localhost:4000/api/diner_preferences/${userId}/preference/${foodCategory}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          food_category: foodCategory
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.response.affectedRows === 0) {
          // Rollback the change
          console.log(data)
        }
      })
  }

  handlePreferenceChange = (event, userId) => {
    if (event.target.checked) {
      this.addUserPreference(userId, event.target.value)
    } else {
      this.removeUserPreference(userId, event.target.value)
    }
  }

  render() {
    const { users, foodCategories } = this.state;

    return (
      <React.Fragment>
        <Paper>
          <Typography variant="title">Select your dietary requirements:</Typography>
        </Paper>
        { !users.length && (
            <CircularProgress size={50} />
          )
        }
        { users.map(user => {
          return (
            <UserExpansionPanel
              key={user.id}
              user={user}
              foodCategories={foodCategories}
              handleChange={this.handlePreferenceChange}
            />
            )
        })}
      </React.Fragment>

    )
  }
}

export default DinerSelect;