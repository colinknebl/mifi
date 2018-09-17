import * as React from 'react';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../app/state/index';

import './signup.css';


class SignUpBtn extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }
  public render() {
    return (
      <Link to="/register">
        <button className="Signup-Btn btn btn-pri">Register</button>
      </Link>
    );
  }
}

export default SignUpBtn;
