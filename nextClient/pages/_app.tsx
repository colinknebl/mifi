import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';

import withData from '../lib/withData';
import Page from '../components/Page';
import getParents from '../lib/getParents';

Router.onRouteChangeStart = () => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => {
	NProgress.done();
};
Router.onRouteChangeError = () => {
	NProgress.done();
};

class Website extends App {
	public props;

	public methods = {
		website: {
			loginFormChangeHandler: this.loginFormChangeHandler.bind(this),
			loginFormSubmitHandler: this.loginFormSubmitHandler.bind(this)
			// getParents: this.getParents.bind(this)
		}
	};

	public state = {
		BudgetGroupLineItemSelected: false,
		loginForm: {
			username: '',
			password: ''
		}
	};

	static async getInitialProps({ Component, ctx }) {
		let pageProps: any = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		pageProps.query = ctx.query;

		return { pageProps };
	}

	render() {
		const { Component, pageProps, apollo } = this.props;

		const props = this.setComponentProps(Component.name, pageProps);

		return (
			<Container>
				<ApolloProvider client={apollo}>
					<Page>
						{logic => <Component {...props} logic={logic} />}
					</Page>
				</ApolloProvider>
			</Container>
		);
	}

	private setComponentProps(componentName, pageProps) {
		const props: any = {
			pageProps,
			methods: this.methods
		};

		switch (componentName) {
			case 'Login':
				props.inputValues = {
					usernameVal: this.state.loginForm.username,
					passwordVal: this.state.loginForm.password
				};
				props.state = this.state;
				break;
			case 'Index':
				props.foo = 'bar';
				break;
			case 'Budget':
				break;
			default:
				console.warn('Unknown component: ', componentName);
		}
		return props;
	}

	// /**
	//  * Returns an object of HTML elements whose classes match a class in the elementClassNames array
	//  * @param target @type {HTMLElement} HTML event.target from click event
	//  * @param elementClassNames @type {string[]} array of class names that are desired
	//  */
	// public getParents(target: HTMLElement, elementClassNames?: string[]) {
	//     const parents: HTMLElement[] = [target];

	//     function getParent(el: HTMLElement) {
	//         if (el.parentElement !== null) {
	//             parents.push(el.parentElement);
	//             getParent(el.parentElement);
	//         }
	//     }

	//     try {
	//         getParent(target);

	//         if (elementClassNames) {
	// 			const desiredElements = parents.filter(el => {
	// 				let match = false;
	// 				elementClassNames.forEach(className => {
	// 					if (el.classList.contains(className)) {
	// 						match = true;
	// 					}
	// 				});
	// 				if (match) {
	// 					return el;
	// 				} else {
	// 					return null;
	// 				}
	// 			});

	// 			return desiredElements.reduce((prev, el) => {
	// 				elementClassNames.forEach(className => {
	// 					if (el.classList.contains(className)) {
	// 						prev[className] = el;
	// 					}
	// 				});
	// 				return prev;
	// 			}, {});
	// 		} else {
	// 			return {
	// 				parents
	// 			};
	// 		}
	//     } catch(err) {
	//         console.error('Error in getting parents of element clicked:', err);
	//         return null;
	//     }
	// }

	public websiteClickHandler = e => {
		const cl = e.target.classList,
			blurEvent = new Event('OnLineItemBlur'),
			parents: any = getParents(e.target);

		const parentClasses: string[] = [];

		if (parents && parents.parents) {
			parents.parents.forEach(el => {
				if (el.classList.length) {
					el.classList.forEach(className => {
						parentClasses.push(className);
					});
				}
			});
		}

		const match = parentClasses.some(className => {
			if (className === 'LineItemDetails') {
				return true;
			} else {
				return false;
			}
		});

		const closeBtn = parentClasses.some(className => {
			if (className === 'LineItemDetails__close-btn') {
				return true;
			} else {
				return false;
			}
		});

		if (!match || closeBtn) {
			if (this.state.BudgetGroupLineItemSelected) {
				removeFocusClass();
			}

			if (cl.contains('js-BudgetGroupLineItem--parent')) {
				cl.add('BudgetGroupLineItem--focus');
				editZIndexOfChildren(e.target, true);
				this.setState({ BudgetGroupLineItemSelected: true });
			} else if (cl.contains('js-BudgetGroupLineItem--child')) {
				e.target.parentElement.classList.add(
					'BudgetGroupLineItem--focus'
				);
				editZIndexOfChildren(e.target.parentElement, true);
				this.setState({ BudgetGroupLineItemSelected: true });
			} else {
				this.setState({ BudgetGroupLineItemSelected: false });
				document.dispatchEvent(blurEvent);
			}
		}

		function removeFocusClass() {
			const BudgetGroupLineItems = document.getElementsByClassName(
				'BudgetGroupLineItem'
			);
			// @ts-ignore
			for (const li of BudgetGroupLineItems) {
				li.classList.remove('BudgetGroupLineItem--focus');
				editZIndexOfChildren(li, false);
			}
		}

		function editZIndexOfChildren(parent, increment: boolean) {
			for (const child of parent.childNodes) {
				if (
					!child.classList.contains('BudgetGroupLineItem__progress')
				) {
					child.style.zIndex = increment ? 2 : 0;
				}
			}
		}
	};

	public loginFormChangeHandler(event) {
		try {
			const field = event.target.getAttribute('data-type'),
				value = event.target.value,
				loginFormInState = this.state.loginForm;

			loginFormInState[field] = value;

			this.setState(() => {
				return {
					loginForm: loginFormInState
				};
			});
		} catch (err) {
			console.error(err);
		}
	}

	public loginFormSubmitHandler(event) {
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(this.state.loginForm)
		};

		fetch('http://localhost:3001/api/login', options)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.err) {
					console.error('error retrieving user');
				} else {
					if (document.location) {
						document.location.assign(data.redirectUrl);
					}
				}
			});
	}
}

export default withData(Website);
