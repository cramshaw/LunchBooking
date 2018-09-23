import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './components/Login';
import NavBar from './components/NavBar';
import DinerSelect from './components/DinerSelect';
import ChefSelect from './components/ChefSelect';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={Login} />
            <Route exact path="/diners" component={DinerSelect} />
            <Route exact path="/chef" component={ChefSelect} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
