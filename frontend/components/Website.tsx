import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Meta from './Meta';
import { theme } from './styles/Theme';

class Website extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<>
					<Meta />
					<div className="App">{this.props.children}</div>
				</>
			</ThemeProvider>
		);
	}
}

export default Website;
