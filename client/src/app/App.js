import React, { Component } from 'react';
import logo from '../_assets/logo.svg';
import './App.css';

import Header from '../components/header/header'
import Sidebar from '../components/sidebar/sidebar'
import Footer from '../components/footer/footer'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Footer />
      </div>
    );
  }
}
