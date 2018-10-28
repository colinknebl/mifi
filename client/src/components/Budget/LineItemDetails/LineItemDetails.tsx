import * as React from 'react';
import './LineItemDetails.css';

import 'font-awesome/css/font-awesome.min.css';

class LineItemDetails extends React.Component<any, any> {

	public state = {
		caretDirection: 'down'
	}

	private progressBarId: string;
	private fundMoreId: string;
	private progressBarPercent: number;

	public render() {

		const state = this.props.state,
			budgetGroupListPosition = state.app.budget.budgetPlus.budgetGroupListPosition,
			lineItemListPosition = state.app.budget.budgetPlus.budgetGroupLineItemListPosition,
			lineItemToRender = state.finances.budget.budgetGroups[budgetGroupListPosition].lineItems[lineItemListPosition],
			budgetGroupHeader = state.app.budget.budgetPlus.budgetGroupHeader,
			detailsHeader = budgetGroupHeader.charAt(0).toUpperCase() + budgetGroupHeader.slice(1).toLowerCase(),
			methods = this.props.methods,
			note = lineItemToRender.note || 'Add a note',
			amountHeader = detailsHeader === 'Income' ? 'Planned' : 'Remaining',
			amount = methods.financial.formatAmount(lineItemToRender.planned),
			actualAmount = methods.financial.formatAmount(lineItemToRender.actual),
			spent = detailsHeader === 'Income' ? 'Received' : 'Spent',
			numberOfTransaction = lineItemToRender.assignedTransactions || 0,
			caretDirection = this.state.caretDirection;

		this.progressBarId = Date.now().toString() + '-details-progress-bar';
		this.fundMoreId = Date.now().toString() + '-fund-more';
		this.progressBarPercent = lineItemToRender.actual / lineItemToRender.planned || 0;
		
		return (
			<aside className="LineItemDetails">
				<button className="LineItemDetails__close-btn">
					<i className="fa fa-times" />
				</button>
				<section className="LineItemDetails__metadata">
					<p className="metadata__group-title">{detailsHeader}</p>
					<p className="metadata__remaining">{amountHeader}</p>
					<p className="metadata__line-item-title" title={lineItemToRender.title}>{lineItemToRender.title}</p>
					<p className="metadata__amount">{amount}</p>
					<span className="metadata__progress-bar">
						<span id={this.progressBarId} className="metadata__progress-bar--inner" />
					</span>
					<p className="metadata__spent"><span className="metadata__spent--green">{actualAmount}</span> {spent}</p>
				</section>
				<section className="LineItemDetails__details">
					{
						detailsHeader !== 'Income' && !lineItemToRender.isFund
							? 	<div className="details__fund">
									<i className="fa fa-university details__icon" />
									<p>Make this a fund</p>
									<i className={`fa fa-caret-${caretDirection} details__icon`} onClick={this.fundCaretClicked} />
									<div id={this.fundMoreId} className="fund__more">
										<p>Funds carry balances month to month, letting you save toward a goal over time.</p>
										<button className="btn btn-blue fund__more__btn" onClick={this.setLineItemAsFund}>Make this a Fund</button>
									</div>
								</div>
							: 	null
					}
					<div className="details__note">
						<i className="fa fa-sticky-note details__icon" />
						<input type="text" value={note} onChange={this.changed} />
					</div>
				</section>
				<section className="LineItemDetails__transactions">
					<p>{numberOfTransaction} Transactions</p>
					<button className="transactions__btn">
						<i className="fa fa-plus-circle" /> <span>Add New</span>
					</button>
				</section>
			</aside>
		);
	}

	public componentDidMount() {
		this.fillInProgressBar();
	}

	public componentDidUpdate() {
		this.fillInProgressBar();
	}

	public changed() {
		console.log('changed');
	}

	private setLineItemAsFund = () => {
		this.props.methods.financial.setLineItemAsFund();
	}

	private fundCaretClicked = () => {
		const fundMore = document.getElementById(this.fundMoreId);
		if (!fundMore) {return}
		if (this.state.caretDirection === 'down') {
			fundMore.classList.add('fund__more--open');
			this.setState({caretDirection: 'up'});
		} else {
			fundMore.classList.remove('fund__more--open');
			this.setState({caretDirection: 'down'});
		}
	}

	private fillInProgressBar() {
		const innerProgressBar = document.getElementById(this.progressBarId);
		if (innerProgressBar) {
			innerProgressBar.style.width = this.progressBarPercent * 100 + '%';
		}
	}
}

export default LineItemDetails;