import React, { Component } from 'react';
// import { AppContext } from '../../app/state/index'
import './register.css';

class Register extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <div className="Register">
        <h1>Register</h1>
      </div>
    );
  }
}

export default Register;
