import * as React from 'react';
import './topbar.css';

class TopBar extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }
  public render() {
    return (
      <main className="TopBar">
        <h1>Top Bar</h1>
      </main>
    );
  }
}

export default TopBar;