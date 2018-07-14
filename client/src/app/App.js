import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { AppProvider } from './state/index'



import Home from '../pages/home/home'
import About from '../pages/about/about'


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/" render={props =>  <Home {...props} />} />
            <Route exact path="/about" render={props => <About {...props} />} />
          </Switch>
        </Router>
      </AppProvider>
    );
  }
}

export default App;

/**
    Simple path exmample:
      Route exact path="/" component={Home} />

    Redirect example: 
      <Route exact path="/about" render={() => (
        this.loggedIn ? (
          <Redirect to="/account"/>
        ) : (
          <Redirect to="/login"/>
        )
      )}/>
 */