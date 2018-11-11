import * as React from 'react';

import MonthSelector from './MonthSelector';
import TransactionHeaderIcon from './TransactionHeaderIcon';

class BudgetPageHeader extends React.Component<any, any> {
	public onClick: () => void;

	constructor(props) {
		super(props);
		console.log('props in budgetpagehader :', props);
		this.onClick = props.methods.financial.updateDisplayedInBudgetPlus
	}
		
	public render() {
		return (
			<section className="BudgetPageHeader">
				<MonthSelector {...{
					state: this.props.state, 
					methods: this.props.methods
				}} />
				<p className="MonthSelector__left-to-budget"><span className="font--dark">$500.00</span> <span className="font--light">left to budget</span></p>
				<TransactionHeaderIcon {...{
					onClick: this.onClick
				}} />
			</section>
		);
	}
}

export default BudgetPageHeader;