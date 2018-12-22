import React, { Component } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import route from '../lib/route';

import { SIGN_IN_MUTATION } from './gql/mutation';
import SVG from './SVGLogo';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};
	loginFormChangeHandler = event => {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};
	handleSubmit = async (event, signIn) => {
		event.preventDefault();
		const user = await signIn();
		if (!user) {
			throw new Error('Username and/or password is incorrect.');
		}
		this.setState({
			email: '',
			password: ''
		});
		route('/app/dashboard', { id: user.data.signIn.id });
	};
	render() {
		return (
			<Mutation mutation={SIGN_IN_MUTATION} variables={this.state}>
				{(signIn, { error, loading }) => {
					if (error) return <p>{error.message}</p>;
					return (
						<div className="form-page">
							<div className="form-page__logo-container">
								<SVG />
							</div>
							<div className="form-page__content-container">
								<section className="form-page__form-container">
									<h1 className="form-page__form-title">
										Log In
									</h1>
									<form
										className="form Login__form"
										method="POST"
										onSubmit={event =>
											this.handleSubmit(event, signIn)
										}
									>
										<div
											className={`form-page__input-group Login__input-group--email ${
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
											className={`form-page__input-group Login__input-group--password ${
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
											New to MiFi?
										</span>
										<Link href="/signup">
											<a className="form-page__footer-link">
												{' '}
												Sign Up
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

export default Login;
