import * as React from 'react';

import './home.css';

import { AppContext, AppProviderState } from '../../app/state/index'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'

class Home extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }
  public render() {
    return (
      <div className="Home">
        <Header />
        <Sidebar />
        <header className="Home-header">
          <h1 className="Home-title">Welcome to React</h1>
        </header>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AppContext.Provider value={AppProviderState}>
          {(context: any) => (
            <React.Fragment>
              <p>{context.state.name}</p>
              <p>{context.state.age}</p>
              <button onClick={context.actions.increaseAge}>increase age</button>
            </React.Fragment>
          )}
        </AppContext.Provider>
        <Footer />
      </div>
    );
  }
}

export default Home;
