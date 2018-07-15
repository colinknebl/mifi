import React, { Component } from 'react';
// import { AppContext } from '../../app/state/index'
import LandingHtml from './landing.html';

class Landing extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <LandingHtml />
    );
  }
}

export default Landing;
