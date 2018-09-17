import * as React from 'react';
import './header.css';

import Navbar from './navbar/navbar'

export default class Header extends React.Component {

  public render() {
    return (
      <header className="Header">
        <h1>My header</h1>
        <Navbar />
      </header>
    );
  }
}
