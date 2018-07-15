import React, { Component } from 'react';
// import { AppContext } from '../../app/state/index'
import './sign-up.css';

class SignUp extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <div className="SignUp">
        <h1>Signup page</h1>
      </div>
    );
  }
}

export default SignUp;
