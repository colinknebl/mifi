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
      <Link to="/sign-up">
        <button className="Signup-Btn btn btn-pri">Sign Up</button>
      </Link>
    );
  }
}

export default SignUpBtn;
