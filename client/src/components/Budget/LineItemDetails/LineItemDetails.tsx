import * as React from 'react';
import './LineItemDetails.css';

import 'font-awesome/css/font-awesome.min.css';

class LineItemDetails extends React.Component {
	private id: string;
	private progressBarPercent: number;

	public render() {

		const { lineItemDetails: d, methods }: any = this.props,
			detailsHeader = d.budgetGroupHeader.charAt(0).toUpperCase() + d.budgetGroupHeader.slice(1).toLowerCase(),
			note = d.note || 'Add a note',
			amountHeader = detailsHeader === 'Income' ? 'Planned' : 'Remaining',
			amount = methods.financial.formatAmount(d.planned),
			actualAmount = methods.financial.formatAmount(d.actual),
			spent = detailsHeader === 'Income' ? 'Received' : 'Spent',
			numberOfTransaction = d.assignedTransactions || 0;

		this.id = Date.now().toString();
		this.progressBarPercent = d.actual / d.planned || 0;

		return (
			<aside className="LineItemDetails">
				<button className="LineItemDetails__close-btn">
					<i className="fa fa-times" />
				</button>
				<section className="LineItemDetails__metadata">
					<p className="metadata__group-title">{detailsHeader}</p>
					<p className="metadata__remaining">{amountHeader}</p>
					<p className="metadata__line-item-title">{d.title}</p>
					<p className="metadata__amount">{amount}</p>
					<span className="metadata__progress-bar">
						<span id={this.id} className="metadata__progress-bar--inner" />
					</span>
					<p className="metadata__spent"><span className="metadata__spent--green">{actualAmount}</span> {spent}</p>
				</section>
				<section className="LineItemDetails__details">
					<div className="details__fund">
						<i className="fa fa-university details__icon" />
						<p>Make this a fund</p>
						<i className="fa fa-caret-down details__icon" />
					</div>
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

	private fillInProgressBar() {
		const innerProgressBar = document.getElementById(this.id);
		if (innerProgressBar) {
			innerProgressBar.style.width = this.progressBarPercent * 100 + '%';
		}
	}
}

export default LineItemDetails;