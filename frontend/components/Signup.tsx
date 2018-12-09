import React, { Component } from 'react';
import Link from 'next/link';
import SVG from './SVGLogo';
import { Mutation } from 'react-apollo';
import route from '../lib/route';

import { SIGNUP_MUTATION } from './gql/mutation';

class SignupComponent extends Component {
	state = {
		lastName: '',
		firstName: '',
		email: '',
		password: '',
		confirmPassword: '',
		country: 'US',
		zip: ''
	};

	async handleSubmit(event, signup) {
		event.preventDefault();
		const user = await signup();
		this.setState({
			lastName: '',
			firstName: '',
			email: '',
			password: '',
			confirmPassword: '',
			country: 'US',
			zip: ''
		});
		route('/app/dashboard', { id: user.id });
	}

	loginFormChangeHandler = event => {
		event.preventDefault();
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			// @ts-ignore
			<Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
				{(signup, { error, loading }) => {
					if (error) return alert(error.message);
					return (
						<div className="form-page">
							<div className="form-page__logo-container">
								<SVG />
							</div>
							<div className="form-page__content-container">
								<section className="form-page__form-container">
									<h1 className="form-page__form-title">
										Create My Account
									</h1>
									<form
										className="form Signup__form"
										method="POST"
										onSubmit={event =>
											this.handleSubmit(event, signup)
										}
									>
										<div
											className={`form-page__input-group Signup__input-group--firstName ${
												this.state.firstName
													? 'form-page__input--filled'
													: ''
											}`}
										>
											<div className="form-page__input-placeholder">
												First Name
											</div>
											<input
												type="text"
												name="firstName"
												className="input form-page__input"
												value={this.state.firstName}
												onChange={
													this.loginFormChangeHandler
												}
											/>
										</div>

										<div
											className={`form-page__input-group Signup__input-group--lastName ${
												this.state.lastName
													? 'form-page__input--filled'
													: ''
											}`}
										>
											<div className="form-page__input-placeholder">
												Last Name
											</div>
											<input
												type="text"
												name="lastName"
												className="input form-page__input"
												value={this.state.lastName}
												onChange={
													this.loginFormChangeHandler
												}
											/>
										</div>

										<div
											className={`form-page__input-group Signup__input-group--email ${
												this.state.email
													? 'form-page__input--filled'
													: ''
											}`}
										>
											<div className="form-page__input-placeholder">
												Email
											</div>
											<input
												type="email"
												name="email"
												className="input form-page__input"
												value={this.state.email}
												onChange={
													this.loginFormChangeHandler
												}
											/>
										</div>

										<div
											className={`form-page__input-group Signup__input-group--password ${
												this.state.password
													? 'form-page__input--filled'
													: ''
											}`}
										>
											<div className="form-page__input-placeholder">
												Password
											</div>
											<input
												type="password"
												name="password"
												className="input form-page__input"
												value={this.state.password}
												onChange={
													this.loginFormChangeHandler
												}
											/>
										</div>

										<div
											className={`form-page__input-group Signup__input-group--confirm-password ${
												this.state.confirmPassword
													? 'form-page__input--filled'
													: ''
											}`}
										>
											<div className="form-page__input-placeholder">
												Confirm Password
											</div>
											<input
												type="password"
												name="confirmPassword"
												className="input form-page__input"
												value={
													this.state.confirmPassword
												}
												onChange={
													this.loginFormChangeHandler
												}
											/>
										</div>

										<div
											className={`form-page__input-group Signup__input-group--country ${
												this.state.country
													? 'form-page__input--filled'
													: ''
											}`}
										>
											<select
												name="country"
												onChange={
													this.loginFormChangeHandler
												}
												defaultValue={'United States'}
											>
												<option value="US">
													United States
												</option>
											</select>
											<i className="fa fa-caret-down" />
										</div>

										<div
											className={`form-page__input-group Signup__input-group--zip ${
												this.state.zip
													? 'form-page__input--filled'
													: ''
											}`}
										>
											<div className="form-page__input-placeholder">
												Zip Code
											</div>
											<input
												type="string"
												name="zip"
												className="input form-page__input"
												value={this.state.zip}
												onChange={
													this.loginFormChangeHandler
												}
											/>
										</div>

										<input
											type="submit"
											id="login--submit-btn"
											className="login--input input btn btn-orange submit-btn"
											value="Sign In"
										/>
									</form>
									<footer className="form-page__footer">
										<hr />
										<span className="form-page__footer-text">
											Already have an account?
										</span>
										<Link href="/login">
											<a className="form-page__footer-link">
												{' '}
												Log In
											</a>
										</Link>
									</footer>
								</section>
							</div>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default SignupComponent;
