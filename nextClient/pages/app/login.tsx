import * as React from 'react';
import Link from 'next/link';
import SVG from '../../components/SVGLogo';

class Login extends React.Component<any, any> {
    public props: any;


	public render() {

		const { loginFormChangeHandler, loginFormSubmitHandler } = this.props.methods.website;
		const { usernameVal, passwordVal } = this.props.inputValues;

		return (
			<div className="Login">
				<div className="Login__content-container">
					<div className="login__logo-container">
						<SVG />
					</div>
					<section className="login--form-container">
						<h1 className="login--title">Sign In</h1>
						<hr />
						<div className="login--grid-container">
							<form id="login--form" onSubmit={loginFormSubmitHandler} >
							<input
								type="text"
								data-type="username"
								id="login--user-input"
								className="login--input input input-text"
								value={usernameVal}
								onChange={loginFormChangeHandler}
								placeholder="Username / Email" />
							<input
								type="password"
								data-type="password"
								id="login--pass-input"
								className="login--input input input-text"
								value={passwordVal}
								onChange={loginFormChangeHandler}
								placeholder="Password" />
							<input
								type="submit"
								id="login--submit-btn"
								className="login--input input btn btn-orange login--submit-btn"
								value="Sign In" />
							</form>
							{/* <Link to="/" id="login--cancel-link" className="login--link">
								<span>Cancel</span>
							</Link>
							<Link to="/register" id="login--register-link" className="login--link">
								<span>Register</span>
							</Link> */}
						</div>
						<hr />
						<p className="login__form-footer">
							<span>New to MiFi? </span>
							<Link href="/register">
								<a className="login--link">Sign Up Now</a>
							</Link>
						</p>
					</section>
				</div>
			</div>
		);
	}
}

export default Login;
