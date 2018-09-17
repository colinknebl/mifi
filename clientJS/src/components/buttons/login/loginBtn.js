import React, { Component } from 'react';
import './loginBtn.css';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../app/state/index';


class LoginBtn extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }

  render() {
    return (
      <Link to="/login" >
        <button className="Login-Btn btn btn-sec">Login</button>
      </Link>
    );
  }
}

export default LoginBtn;
