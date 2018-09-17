import React, { Component } from 'react';
// import { AppContext } from '../../app/state/index'
import { Link } from 'react-router-dom';
import './register.css';

class Register extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps


    this.state = {
      form: {
        username: '',
        password: ''
      }
    }
  }



  render() {
    return (
      <div className="Register">
        <section className="register--content-container">
          <h1 className="register--title">Register</h1>
          <hr />
          <div className="register--grid-container">
            <form id="register--form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                id="register--first-name-input"
                className="register--input input input-text"
                value={this.state.form.username}
                onChange={this.handleNameChange}
                placeholder="First Name" />
              <input
                type="text"
                id="register--last-name-input"
                className="register--input input input-text"
                value={this.state.form.username}
                onChange={this.handleNameChange}
                placeholder="Last Name" />
              <input
                type="email"
                id="register--email-input"
                className="register--input input input-text"
                value={this.state.form.username}
                onChange={this.handleNameChange}
                placeholder="Email" />
              <input
                type="text"
                id="register--username-input"
                className="register--input input input-text"
                value={this.state.form.username}
                onChange={this.handleNameChange}
                placeholder="Username" />
              <input
                type="password"
                id="register--pass-input"
                className="register--input input input-text"
                value={this.state.form.password}
                placeholder="Password" />
              <input
                type="password"
                id="register--pass-input"
                className="register--input input input-text"
                value={this.state.form.password}
                placeholder="Confirm Password" />
              <input
                type="submit"
                id="register--submit-btn"
                className="register--input input btn btn-pri register--submit-btn"
                value="Submit" />
            </form>
            <Link to="/" id="register--cancel-link" className="register--link">
              <span>Cancel</span>
            </Link>
            <Link to="/login" id="register--register-link" className="register--link">
              <span>Log in</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;
