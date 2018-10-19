import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { AppProvider } from './state';

import About from '../pages/about/about';
import App from '../pages/App/App';
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

class Website extends React.Component {

	public state = {
		BudgetGroupLineItemSelected: false,
		loginForm: {
			username: '',
			password: ''
		}
	}

	public methods = {
		website: {
			loginFormChangeHandler: this.loginFormChangeHandler.bind(this),
			loginFormSubmitHandler: this.loginFormSubmitHandler.bind(this)
		}
	}

	public render() {
		return (
			<section onClick={this.websiteClickHandler}>
				<AppProvider>
					<Router>
						<Switch>
							<Route exact={true} path="/" render={props =>  <Landing {...props} />} />
							<Route exact={true} path="/about" render={props => <About {...props} />} />
							<Route exact={true} path="/login" render={props => <Login {...{
								props,
								methods: this.methods,
								inputValues: {
									usernameVal: this.state.loginForm.username,
									passwordVal: this.state.loginForm.password
								}
							}} />} />
							<Route exact={true} path="/register" render={props => <Register {...props} />} />
							<Route path="/app" render={props => <App {...{
								routerProps: props,
								websiteClickHandler: this.websiteClickHandler
							}} />} />
						</Switch>
					</Router>
				</AppProvider>
			</section>
		);
	}

	public websiteClickHandler = (e) => {
		const cl = e.target.classList;

		if (this.state.BudgetGroupLineItemSelected) {
			removeFocusClass();
		}

		if (cl.contains('js-BudgetGroupLineItem--parent')) {
			cl.add('BudgetGroupLineItem--focus');
			editZIndexOfChildren(e.target, true);
			this.setState({BudgetGroupLineItemSelected: true});
		
		} else if (cl.contains('js-BudgetGroupLineItem--child')) {
			e.target.parentElement.classList.add('BudgetGroupLineItem--focus');
			editZIndexOfChildren(e.target.parentElement, true);
			this.setState({BudgetGroupLineItemSelected: true});
		} else {
			this.setState({BudgetGroupLineItemSelected: false});
		}

		function removeFocusClass() {
			const BudgetGroupLineItems = document.getElementsByClassName('BudgetGroupLineItem');
			// @ts-ignore
			for (const li of BudgetGroupLineItems) {
				li.classList.remove('BudgetGroupLineItem--focus');
				editZIndexOfChildren(li, false);
			}
		}

		function editZIndexOfChildren(parent, increment: boolean) {
			for (const child of parent.childNodes) {
				if (!(child.classList.contains('BudgetGroupLineItem__progress'))) {
				child.style.zIndex = increment ? 2 : 0;
				}
			}
		}
	}

	public loginFormChangeHandler(event) {
		try {
			const field = event.target.getAttribute('data-type'),
				value = event.target.value,
				loginFormInState = this.state.loginForm;
			
			loginFormInState[field] = value;

			this.setState(() => {
				return {
					loginForm: loginFormInState
				}
			});

		} catch(err) {
			console.error(err);
		}
	}

	public loginFormSubmitHandler(event) {
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(this.state.loginForm)
		}

		fetch('http://localhost:3001/api/login', options)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if (data.err) {
					console.error('error retrieving user');
				} else {
					document.location.assign(data.redirectUrl)
				}
			})
	}
}

export default Website;

/**
    Simple path exmample:
      Route exact path="/" component={Home} />

    Redirect example: 
      <Route exact path="/about" render={() => (
        this.loggedIn ? (
          <Redirect to="/account"/>
        ) : (
          <Redirect to="/login"/>
        )
      )}/>
 */