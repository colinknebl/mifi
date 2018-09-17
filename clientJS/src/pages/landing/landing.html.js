import React, { Component } from 'react';
import './landing.css';
// import { AppContext } from '../../app/state/index'

import LoginBtn from '../../components/buttons/login/loginBtn';
import SignUpBtn from '../../components/buttons/signup/signup';
import SVG from '../../components/SVGLogo/SVGLogo';

class LandingHtml extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <div className="Landing">
        <h1 className="landing-title">MiFi</h1>
        <SVG />
        <div className="landing-btn-container">
          <SignUpBtn />
          <LoginBtn />
        </div>
      </div>
    );
  }
}

export default LandingHtml;
