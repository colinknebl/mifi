import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  //Redirect
} from 'react-router-dom';

import { AppProvider } from './state/index';

import Landing from '../pages/landing/landing';
// import Home from '../pages/home/home';
import About from '../pages/about/about';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

class App extends Component {

  render() {
    return (
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/" render={props =>  <Landing {...props} />} />
            <Route exact path="/about" render={props => <About {...props} />} />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/register" render={props => <Register {...props} />} />
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