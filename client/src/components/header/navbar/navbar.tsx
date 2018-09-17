import * as React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default class Navbar extends React.Component {
  public render() {
    return (
      <nav className="Navbar">
        <h1>My Navbar</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    );
  }
}
