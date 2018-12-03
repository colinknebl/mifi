import * as React from 'react';

import LinkPlaid from './LinkPlaid';

class Dashboard extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		console.log(this);
		const { state } = this.props.appData;
		return (
			<>
				<h1>Dashboard</h1>
				<LinkPlaid
					{...{
						state
					}}
				/>
			</>
		);
	}
}

export default Dashboard;
