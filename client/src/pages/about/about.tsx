import * as React from 'react';
import './about.css';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

class About extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }
  public render() {
    return (
      <main className="About">
        <Header />
        <h1>About</h1>
        <Footer />
      </main>
    );
  }
}

export default About;