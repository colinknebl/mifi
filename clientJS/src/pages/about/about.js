import React, { Component } from 'react';
import './about.css';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class About extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
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