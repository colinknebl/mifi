import React from 'react';
import Meta from './Meta';

/**
 * wrapper for the page
 * @param props component properties
 */

// const Page = props => (
// 	<>
// <Meta />
// <main className="App">{props.children}</main>
// 	</>
// );

class Page extends React.Component {
	methods = {
		method1: () => console.log('method 1')
	};
	render() {
		console.log(this.props.children);
		return (
			<>
				<Meta />
				<main className="App">{this.props.children(this.methods)}</main>
			</>
		);
	}
}

export default Page;
