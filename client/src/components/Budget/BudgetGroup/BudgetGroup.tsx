// import * as hash from 'object-hash';
import * as React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import './BudgetGroup.css';


import BudgetGroupLineItem from '../BudgetGroupLineItem/BudgetGroupLineItem';

import { IBudgetGroup, IBudgetGroupLineItem } from '../../../mifi';

class BudgetGroup extends React.Component {
	public props: IBudgetGroup;
	public lineItems: IBudgetGroupLineItem[];

	public state = {
		minimized: false
	}

	constructor(props: IBudgetGroup) {
		super(props)

		this.state.minimized = props.minimized;
	}

	// public shouldComponentUpdate(nextProps, nextState) {
	// 	if (hash(this.state) !== hash(nextState) || 
	// 		hash(this.props) !== hash(nextProps)) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	public render() {

		if (this.props.lineItems.length > 1) {
			this.lineItems = this.orderLineItems(this.props.lineItems);
		} else {
			this.lineItems = this.props.lineItems;
		}
		
		const { header, methods: { financial: fn }, calcTotals } = this.props;

		const plannedSum = fn.formatAmount(fn.sum(this.props.lineItems, 'planned')),
			receivedSum = fn.formatAmount(fn.sum(this.props.lineItems, 'actual')),
			icon = this.state.minimized ? 'down' : 'up';

		return (
			<li className="BudgetGroup" data-header={header} data-listposition={this.props.listPosition} >
				<h6 className="BudgetGroup__header font--dark">
					{header.toUpperCase()}
					<button className="BudgetGroup__caret-icon" onClick={this.budgetGroupExpandCloseHandler}>
						<i className={`fa fa-caret-${icon}`} aria-hidden="true" />
					</button>
				</h6>
				<span className="BudgetGroup__column--right column-header__planned font--light">Planned</span>
				<span className="BudgetGroup__column--right column-header__received font--light">{
					header === 'income' ? 'Received' : 'Remaining'
				}</span>
				{
					!this.state.minimized 
						? <ShowLineItems {...{
								lineItems: this.lineItems,
								methods: this.props.methods,
								calcTotals,
								plannedSum,
								receivedSum
							}} /> 
						: null
				}
			</li>
		);
	}

	public budgetGroupExpandCloseHandler = (e) => {
		e.preventDefault();
		this.setState({minimized: !this.state.minimized})
	}

	private orderLineItems(lineItems) {
		const orderedLineItems: IBudgetGroupLineItem[] = [];
		lineItems.map((item, i) => {
			orderedLineItems.splice(item.listPosition, 0, item);
		});
		return orderedLineItems;
	}
}

export default BudgetGroup;

function ShowLineItems(props: any) {
	return (
		<React.Fragment>
			<ul className="BudgetGroup__line-item-list">
				{
					props.lineItems.map((lineItem: IBudgetGroupLineItem, num: number) => {
						return <BudgetGroupLineItem key={num} methods={props.methods} {...{
							actual: lineItem.actual,
							planned: lineItem.planned,
							title: lineItem.title,
							listPosition: lineItem.listPosition,
							budgetGroupBelongsTo: props.listPosition
						}} />
					})
				}
			</ul>
			{props.calcTotals
				? <Totals
					plannedSum={props.plannedSum} receivedSum={props.receivedSum}
					onAddClick={props.methods.financial.addBudgetGroupLineItem} />
				: <AddItemBtn
					onClick={props.methods.financial.addBudgetGroupLineItem} />}
		</React.Fragment>
	)
}


function Totals(props: any): any {
	return (
		<React.Fragment>
			<AddItemBtn onClick={props.onAddClick} />
			<span className="BudgetGroup__column--right">{props.plannedSum}</span>
			<span className="BudgetGroup__column--right">{props.receivedSum}</span>
		</React.Fragment>
	)
}

function AddItemBtn(props: any) {
	return (
		<button className="BudgetGroup__add-item-btn" onClick={props.onClick}>+ Add Item</button>
	)
}