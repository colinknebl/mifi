import * as React from 'react';

import MonthSelector from './MonthSelector';
import TransactionHeaderIcon from './TransactionHeaderIcon';

class BudgetPageHeader extends React.Component<any, any> {
	public onClick: () => void;

	constructor(props) {
		console.log('props in budgetPageHeader', props);
		super(props);
		this.onClick =
			props.appData.methods.financial.updateDisplayedInBudgetPlus;
	}

	public render() {
		return (
			<section className="BudgetPageHeader">
				<MonthSelector
					{...{
						state: this.props.appData.state,
						methods: this.props.methods
					}}
				/>
				<p className="MonthSelector__left-to-budget">
					<span className="font--dark">$500.00</span>{' '}
					<span className="font--light">left to budget</span>
				</p>
				<TransactionHeaderIcon
					{...{
						onClick: this.onClick
					}}
				/>
			</section>
		);
	}
}

export default BudgetPageHeader;
