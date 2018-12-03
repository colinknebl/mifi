import * as React from 'react';

import formatMoney from '../../../lib/formatMoney';

import { IBudgetGroupLineItem } from '../../../typescript/interfaces/mifi';

class BudgetGroupLineItem extends React.Component<any, any> {
	public props: IBudgetGroupLineItem;
	public progressBarId: string;
	public lineItemId: string;

	constructor(props: IBudgetGroupLineItem) {
		super(props);
		this.lineItemId = props.id + '-line-item';
		this.progressBarId = props.id + '-progress-bar';
	}

	public render() {
		const {
				title,
				listPosition,
				methods: { financial: fn }
			} = this.props,
			planned = formatMoney(this.props.planned),
			actual = formatMoney(this.props.actual);

		return (
			<li
				id={this.lineItemId}
				className="BudgetGroupLineItem js-BudgetGroupLineItem--parent"
				data-listposition={listPosition}
				onClick={this.lineItemClicked}
			>
				<i className="fa fa-university BudgetGroupLineItem__fund-icon" />
				<input
					type="text"
					className="BudgetGroupLineItem__input BudgetGroupLineItem--editable js-BudgetGroupLineItem--child"
					data-groupnumber={this.props.budgetGroupBelongsTo}
					data-listposition={this.props.listPosition}
					value={title}
					onChange={fn.onLineItemTitleChange}
				/>
				<input
					type="text"
					className="BudgetGroupLineItem__input BudgetGroupLineItem__input--right BudgetGroupLineItem--editable js-BudgetGroupLineItem--child"
					value={planned}
					onChange={fn.onLineItemTitleChange}
				/>
				<input
					type="text"
					className="BudgetGroupLineItem__input BudgetGroupLineItem__input--right js-BudgetGroupLineItem--child"
					value={actual}
					readOnly={true}
				/>
				<span
					id={this.progressBarId}
					className="BudgetGroupLineItem__progress"
				/>
				<button
					className="BudgetGroupLineItem__options-btn BudgetGroupLineItem__options-btn--trash"
					onClick={fn.deleteBudgetGroupLineItem}
					title="Delete from list"
				>
					<i className="fa fa-trash-o" />
				</button>
				<button
					className="BudgetGroupLineItem__options-btn BudgetGroupLineItem__options-btn--up"
					onClick={fn.updateBudgetGroupLineItemPosition}
					title="Move up list"
				>
					<i className="fa fa-plus" />
				</button>
				<button
					className="BudgetGroupLineItem__options-btn BudgetGroupLineItem__options-btn--down"
					onClick={fn.updateBudgetGroupLineItemPosition}
					title="Move down list"
				>
					<i className="fa fa-minus" />
				</button>
			</li>
		);
	}

	public componentDidMount() {
		const el = document.getElementById(this.progressBarId);
		this.fillInProgressBar(el);

		if (this.props.isFund) {
			const li = document.getElementById(this.lineItemId);
			if (li) {
				li.classList.add('BudgetGroupLineItem--fund');
			}
		}
	}

	public fillInProgressBar(el) {
		const planned = this.props.actual,
			actual = this.props.planned;
		let percent, cssPercent;

		if (planned > 0) {
			percent = planned / actual;
			if (percent > 1) {
				cssPercent = 1 * 100;
			} else {
				cssPercent = percent * 100;
			}

			if (el) {
				el.style.width = cssPercent.toString() + '%';
				if (percent > 1) {
					el.style.borderColor = 'var(--red)';
				} else {
					el.style.borderColor = 'var(--pri-color)';
				}
			}
		}
	}

	private lineItemClicked = event => {
		this.props.methods.financial.lineItemClicked(event, this.lineItemId);
	};
}

export default BudgetGroupLineItem;
