import React, { Component } from 'react';
// import { AppContext } from '../../app/state/index'
import './login.css';

class Login extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <div className="Login">
        <h1>login page</h1>
      </div>
    );
  }
}

export default Login;
