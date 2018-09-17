import * as React from 'react';
// import { AppContext } from '../../app/state/index'
import LandingHtml from './landing.html';

class Landing extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }
  public render() {
    return (
      <LandingHtml />
    );
  }
}

export default Landing;
