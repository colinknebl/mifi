import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { AppProvider } from './state';

import About from '../pages/about/about';
import App from '../pages/App/App';
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

class Website extends React.Component {

  public state = {
    BudgetGroupLineItemSelected: false
  }

  public render() {
    return (
      <section onClick={this.websiteClickHandler}>
        <AppProvider>
          <Router>
            <Switch>
              <Route exact={true} path="/" render={props =>  <Landing {...props} />} />
              <Route exact={true} path="/about" render={props => <About {...props} />} />
              <Route exact={true} path="/login" render={props => <Login {...props} />} />
              <Route exact={true} path="/register" render={props => <Register {...props} />} />
              <Route path="/app" render={props => <App {...{
                routerProps: props,
                websiteClickHandler: this.websiteClickHandler
              }} />} />
            </Switch>
          </Router>
        </AppProvider>
      </section>
    );
  }

  public websiteClickHandler = (e) => {
    const cl = e.target.classList;

    if (this.state.BudgetGroupLineItemSelected) {
      removeFocusClass();
    }

    if (cl.contains('js-BudgetGroupLineItem--parent')) {
      cl.add('BudgetGroupLineItem--focus');
      editZIndexOfChildren(e.target, true);
      this.setState({BudgetGroupLineItemSelected: true});
      
    } else if (cl.contains('js-BudgetGroupLineItem--child')) {
      e.target.parentElement.classList.add('BudgetGroupLineItem--focus');
      editZIndexOfChildren(e.target.parentElement, true);
      this.setState({BudgetGroupLineItemSelected: true});
    } else {
      this.setState({BudgetGroupLineItemSelected: false});
    }

    function removeFocusClass() {
      const BudgetGroupLineItems = document.getElementsByClassName('BudgetGroupLineItem');
      // @ts-ignore
      for (const li of BudgetGroupLineItems) {
        li.classList.remove('BudgetGroupLineItem--focus');
        editZIndexOfChildren(li, false);
      }
    }

    function editZIndexOfChildren(parent, increment: boolean) {
      for (const child of parent.childNodes) {
        if (!(child.classList.contains('BudgetGroupLineItem__progress'))) {
          child.style.zIndex = increment ? 2 : 0;
        }
      }
    }
  }
}

export default Website;

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