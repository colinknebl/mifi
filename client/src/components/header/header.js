import React, { Component } from 'react';
import './header.css';

import Navbar from './navbar/navbar'

export default class Header extends Component {

  render() {
    return (
      <header className="Header">
        <h1>My header</h1>
        <Navbar />
      </header>
    );
  }
}
