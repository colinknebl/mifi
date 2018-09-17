import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';

import { AppProvider } from './state/index';

// import Home from '../pages/home/home';
import About from '../pages/about/about';
import Budget from '../pages/budget/budget';
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

class App extends React.Component {

  public render() {
    return (
      <AppProvider>
        <Router>
          <Switch>
            <Route exact={true} path="/" render={props =>  <Landing {...props} />} />
            <Route exact={true} path="/about" render={props => <About {...props} />} />
            <Route exact={true} path="/login" render={props => <Login {...props} />} />
            <Route exact={true} path="/register" render={props => <Register {...props} />} />
            <Route exact={true} path="/budget" render={props => <Budget {...props} />} />
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