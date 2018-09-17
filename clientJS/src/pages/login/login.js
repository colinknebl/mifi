import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../app/state/index'
import './login.css';

class Login extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps;


    this.state = {
      form: {
        username: '',
        password: ''
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert(this.state.form.username, this.state.form.password);
  }

  handleNameChange = (event) => {
    this.setState({
      form: { username: event.target.value}
    })
  }

  render() {
    return (
      <div className="Login">
        <section className="login--content-container">
          <h1 className="login--title">Login</h1>
          <hr />
          <div className="login--grid-container">
            <form id="login--form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                id="login--user-input"
                className="login--input input input-text"
                value={this.state.form.username}
                onChange={this.handleNameChange}
                placeholder="Username / Email" />
              <input
                type="password"
                id="login--pass-input"
                className="login--input input input-text"
                value={this.state.form.password}
                placeholder="Password" />
              <input
                type="submit"
                id="login--submit-btn"
                className="login--input input btn btn-pri login--submit-btn"
                value="Submit" />
            </form>
            <Link to="/" id="login--cancel-link" className="login--link">
              <span>Cancel</span>
            </Link>
            <Link to="/register" id="login--register-link" className="login--link">
              <span>Register</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
