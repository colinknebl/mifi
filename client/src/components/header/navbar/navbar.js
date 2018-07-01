import React, { Component } from 'react';
import './navbar.css';

import { AppContext } from '../../../app/state/state'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <h1>My Navbar</h1>
        <AppContext>
          {(context) => (
            <React.Fragment>
              <p>{context.state.name}</p>
              <p>{context.state.age}</p>
              <button onClick={context.actions.increaseAge}>increase age</button>
            </React.Fragment>
          )}
        </AppContext>
      </nav>
    );
  }
}
