import * as React from 'react';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../app/state/index';


import './loginBtn.css';


class LoginBtn extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }

  public render() {
    return (
      <Link to="/login" >
        <button className="Login-Btn btn btn-sec">Login</button>
      </Link>
    );
  }
}

export default LoginBtn;
