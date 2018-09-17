import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../app/state/index';


class SignUpBtn extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <Link to="/register">
        <button className="Signup-Btn btn btn-pri">Register</button>
      </Link>
    );
  }
}

export default SignUpBtn;
