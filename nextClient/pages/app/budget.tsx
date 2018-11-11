import * as React from 'react';
import AppMain from '../../components/AppMain';


class Budget extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
	}

	public render() {

		return <AppMain {...{
			props: this.props,
			render: 'Budget'
		}} />;
	}
}

export default Budget;
