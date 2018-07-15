import React, { Component } from 'react';
import './landing.css';
// import { AppContext } from '../../app/state/index'
import logo from '../../_assets/images/logo-512-black.png'

import LoginBtn from '../../components/buttons/login/loginBtn';
import SignUpBtn from '../../components/buttons/signup/signup';


class LandingHtml extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <div className="Landing">
        <h1 className="landing-title">MiFi</h1>
        <img src={logo} alt="logo" className="landing-logo" />

        <div className="landing-btn-container">
          <SignUpBtn />
          <LoginBtn />
        </div>
      </div>
    );
  }
}

export default LandingHtml;
