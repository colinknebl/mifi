import React, { Component } from 'react';
import './home.css';
import logo from '../../_assets/images/logo.svg'
import { AppContext } from '../../app/state/index'

import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import Footer from '../../components/footer/footer'

class Home extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <div className="Home">
        <Header />
        <Sidebar />
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h1 className="Home-title">Welcome to React</h1>
        </header>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AppContext>
          {(context) => (
            <React.Fragment>
              <p>{context.state.name}</p>
              <p>{context.state.age}</p>
              <button onClick={context.actions.increaseAge}>increase age</button>
            </React.Fragment>
          )}
        </AppContext>
        <Footer />
      </div>
    );
  }
}

export default Home;
