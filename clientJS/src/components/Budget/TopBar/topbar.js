import React, { Component } from 'react';
import './topbar.css';

class TopBar extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <main className="TopBar">
        <h1>Top Bar</h1>
      </main>
    );
  }
}

export default TopBar;