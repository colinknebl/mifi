import * as React from 'react';
import MonthSelectorDropdown from './MonthSelectorDropdown';

class MonthSelector extends React.Component<any, any> {

	public state = {
		monthSelectorMinimized: true
	}

	constructor(props) {
		super(props);
		const date = new Date();
		
		if (props.state.user.newUser) {
			console.log('new user');
			props.methods.user.updateUserLastBudgetState(date.getMonth(), date.getFullYear())			
		}
	}
    
	public render() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const { month, year } = this.props.state.user.lastBudgetState.monthSelector;
		const iconDirection = this.state.monthSelectorMinimized ? 'down' : 'up';

		return (
			<section className="MonthSelector">
				<h2 className="MonthSelector__month">
					<span className="font--dark">{months[month]}</span>
					<span className="font--light">{year}</span>
					<button className="btn-caret BudgetGroup__caret-icon" onClick={this.setMonthSelectorMinimizedState}>
						<i className={`fa fa-caret-${iconDirection}`} />
					</button>
				</h2>
				{
					this.state.monthSelectorMinimized
					? null
					: <MonthSelectorDropdown {...{
						months,
						state: this.props.state,
						methods: this.props.methods,
						setMonthSelectorMinimizedState: this.setMonthSelectorMinimizedState
					}} />
				}
			</section>
		);
	}

	public setMonthSelectorMinimizedState = () => {
		this.setState({monthSelectorMinimized: !this.state.monthSelectorMinimized})
    }
}

export default MonthSelector;