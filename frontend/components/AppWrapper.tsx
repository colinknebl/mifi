import React, { Component } from 'react';
import InitialState from '../InitialState';
import AppNavigationBar from './app/Navigation/AppNavigationBar';

import getParents from '../lib/getParents';

class AppWrapper extends Component {
	state: any = InitialState;

	render() {
		if (typeof this.props.children === 'function') {
			return (
				<>
					<AppNavigationBar />
					<main className="App__content-container">
						{this.props.children({
							state: this.state,
							methods: this.methods
						})}
					</main>
				</>
			);
		} else {
			return <>{this.props.children}</>;
		}
	}

	public updateDisplayedInBudgetPlus = event => {
		event.preventDefault();
		const app = this.state.app;
		app.budget.budgetPlus.display =
			event.target.getAttribute('title') || 'Graph';

		this.setState(() => {
			return {
				app: { ...app }
			};
		});
	};

	public onLineItemTitleChange = event => {
		event.preventDefault();

		const parents: any = getParents(event.target, ['BudgetGroup']);
		if (!parents) throw new Error('No parents found');

		const groupNumber = parents.BudgetGroup.getAttribute(
			'data-listposition'
		);
		const listPosition = event.target.getAttribute('data-listposition');
		const finances = this.state.finances;
		const lineItem = this.state.finances.budget.budgetGroups[groupNumber]
			.lineItems[listPosition];
		const newTitle = event.target.value;

		lineItem.title = newTitle;

		this.setState(() => {
			return {
				finances: { ...finances }
			};
		});
	};

	public lineItemClicked = (event, lineItemId: string) => {
		const { BudgetGroupLineItem, BudgetGroup }: any = getParents(
				event.target,
				['BudgetGroupLineItem', 'BudgetGroup']
			),
			budgetGroupLineItemListPosition = BudgetGroupLineItem.getAttribute(
				'data-listposition'
			),
			budgetGroupListPosition = BudgetGroup.getAttribute(
				'data-listposition'
			),
			appState = this.state.app;

		appState.budget.budgetPlus = {
			display: 'LineItemDetails',
			budgetGroupHeader: BudgetGroup.getAttribute('data-header'),
			budgetGroupListPosition,
			budgetGroupLineItemListPosition,
			lineItemId
		};

		this.setState(() => {
			return {
				app: { ...appState }
			};
		});
	};

	methods = {
		financial: {
			updateDisplayedInBudgetPlus: this.updateDisplayedInBudgetPlus,
			onLineItemTitleChange: this.onLineItemTitleChange,
			lineItemClicked: this.lineItemClicked
		}
	};
}

export default AppWrapper;
