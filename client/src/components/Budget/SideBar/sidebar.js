import React, { Component } from 'react';
import './sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';

import SVG from '../../SVGLogo/SVGLogo';

class SideBar extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <section className="SideBar">
        <div className="sidebar--image-container">
          <SVG />
        </div>
        
        <nav className="sidebar--navigation">
          <ul className="sidebar--navigation-list sidebar--navigation-top">
            <li className="sidebar--navigation-li" title="Budget">
              <Link className="sidebar--navigation-link" to="/budget">
                <i className="fa fa-folder-open-o"></i>
                <span className="sidebar--navigation-descript">Budget</span>
              </Link>
            </li>
            <li className="sidebar--navigation-li" title="">
              <Link className="sidebar--navigation-link" to="/budget">
                <i className="fa fa-folder-o"></i>
                <span className="sidebar--navigation-descript">Folder Closed</span>
              </Link>
            </li>
            <li className="sidebar--navigation-li" title="">
              <Link className="sidebar--navigation-link" to="/budget">
                <i className="fa fa-code"></i>
                <span className="sidebar--navigation-descript">Code</span>
              </Link>
            </li>
            <li className="sidebar--navigation-li" title="">
              <Link className="sidebar--navigation-link" to="/budget">
                <i className="fa fa-bullseye"></i>
                <span className="sidebar--navigation-descript">Bullseye</span>
              </Link>
            </li>
          </ul>

          <ul className="sidebar--navigation-list sidebar--navigation-bottom">
            <li className="sidebar--navigation-li" title="Settings">
              <Link className="sidebar--navigation-link" to="account">
                <i className="fa fa-sliders"></i>
                <span className="sidebar--navigation-descript">Account Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar--nametag">
          <div className="sidebar--nametag-icon" title="Jessica Knebl">JK</div>
          <span className="sidebar--nametag-email">jessica.knebl@gmail.com</span>
          <Link className="sidebar--nametag-link link" to="/">Sign Out</Link>
        </div>
      </section>
    );
  }
}

export default SideBar;