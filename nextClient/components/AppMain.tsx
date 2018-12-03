import React, { Component } from 'react';
import Budget from './Budget/Budget';
import Dashboard from '../components/Dashboard/Dashboard';
import AppNavigationBar from './Navigation/AppNavigationBar';
import state from './InitialState';

import {
	IReOrderLineItemsOptions,
	IBudgetGroupLineItem
} from '../typescript/interfaces/mifi';

class AppMain extends Component {
	public getParents: Function;
	private componentToRender: string;

	public state: any = state;

	public methods: any = {
		financial: {
			addCurrencySymbol: this.addCurrencySymbol.bind(this),
			sum: this.sum.bind(this),
			formatAmount: this.formatAmount.bind(this),
			onLineItemTitleChange: this.onLineItemTitleChange.bind(this),
			addBudgetGroupLineItem: this.addBudgetGroupLineItem.bind(this),
			updateDisplayedInBudgetPlus: this.updateDisplayedInBudgetPlus.bind(
				this
			),
			updateBudgetGroupLineItemPosition: this.updateBudgetGroupLineItemPosition.bind(
				this
			),
			deleteBudgetGroupLineItem: this.deleteBudgetGroupLineItem.bind(
				this
			),
			lineItemClicked: this.lineItemClicked.bind(this),
			setLineItemAsFund: this.setLineItemAsFund.bind(this),
			reorderBudgetGroups: this.reorderBudgetGroups.bind(this),
			orderItems: this.orderItems.bind(this),
			changeMonth: this.changeMonth.bind(this)
		},
		user: {
			updateUserLastBudgetState: this.updateUserLastBudgetState.bind(this)
		}
	};

	constructor(componentProps) {
		super(componentProps);

		const { props, render } = componentProps;
		this.componentToRender = render;
		this.getParents = props.methods.website.getParents;
	}

	render() {
		console.log('AppMain props', this.props);
		return (
			<section>
				<AppNavigationBar />
				<section className="App__content-container">
					{this.renderComponent()}
				</section>
			</section>
		);
	}

	private renderComponent() {
		switch (this.componentToRender) {
			case 'Budget':
				return (
					<Budget
						{...{
							state: this.state,
							methods: this.methods
						}}
					/>
				);
			case 'Dashboard':
				return (
					<Dashboard
						{...{
							state: this.state,
							methods: this.methods
						}}
					/>
				);
			default:
				console.warn('Unknow component:', this.componentToRender);
				return null;
		}
	}

	public changeMonth(event) {
		const userState = this.state.user,
			parent = this.getParents(event.target, [
				'MonthSelectorDropdown__month-box'
			]),
			monthEl = parent['MonthSelectorDropdown__month-box'],
			monthNum = parseInt(monthEl.getAttribute('data-month-num'), 10),
			year = parseInt(
				monthEl.textContent.slice(3, monthEl.textContent.length),
				10
			);

		userState.lastBudgetState.monthSelector = {
			month: monthNum,
			year
		};

		this.setState({ user: { ...userState } });
	}

	public componentDidMount() {
		document.addEventListener('OnLineItemBlur', this.lineItemBlurred);
	}

	public updateUserLastBudgetState(month: number, fullYear: number) {
		const userState = this.state.user;
		userState.lastBudgetState.monthSelector = {
			month,
			year: fullYear
		};

		this.setState({ user: { ...userState } });
	}

	public orderItems(items) {
		const sortedItems = items.sort((itemA, itemB) => {
			if (itemA.listPosition < itemB.listPosition) {
				return -1;
			} else if (itemA.listPosition > itemB.listPosition) {
				return 1;
			} else {
				return 0;
			}
		});
		const numneredAndOrderedItems = sortedItems.map((item, i) => {
			item.listPosition = i;
			return item;
		});
		return numneredAndOrderedItems;
	}

	public reorderBudgetGroups(budgetGroupList) {
		const financialState = this.state.finances;
		const domListOrder = Array.from(budgetGroupList.children).reduce(
			(prev: any[], group) => {
				// @ts-ignore
				prev[group.getAttribute('data-header')] = {
					// @ts-ignore
					listPosition: parseInt(
						group.getAttribute('data-listposition'),
						10
					)
				};
				return prev;
			},
			{}
		);

		const map = this.state.finances.budget.budgetGroups
			.map(group => {
				group.listPosition = domListOrder[group.header].listPosition;
				return group;
			})
			.sort((groupA, groupB) => {
				if (groupA.listPosition < groupB.listPosition) {
					return -1;
				} else if (groupA.listPosition > groupB.listPosition) {
					return 1;
				} else {
					return 0;
				}
			});

		financialState.budget.budgetGroups = map;
		this.setState({ finances: { ...financialState } });
	}

	public setLineItemAsFund() {
		const appState = this.state.app;
		const lineItemEl = document.getElementById(
			this.state.app.budget.budgetPlus.lineItemId
		);
		const {
			budgetGroupListPosition,
			budgetGroupLineItemListPosition
		} = appState.budget.budgetPlus;
		const lineItemState = this.state.finances.budget.budgetGroups[
			budgetGroupListPosition
		].lineItems[budgetGroupLineItemListPosition];

		lineItemState.isFund = true;

		this.setState(() => {
			return {
				app: { ...appState }
			};
		});

		if (lineItemEl) {
			lineItemEl.classList.add('BudgetGroupLineItem--fund');
		}
	}

	public lineItemBlurred = () => {
		const appState = this.state.app;
		appState.budget.budgetPlus = {
			display: 'Graph',
			lineItemDetails: null
		};

		this.setState(() => {
			return {
				app: { ...appState }
			};
		});
	};

	public lineItemClicked(event, lineItemId: string) {
		const { BudgetGroupLineItem, BudgetGroup }: any = this.getParents(
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
	}

	public addCurrencySymbol(amount: string): string {
		const { currency } = this.state.user.settings;
		if (currency === 'XX') {
			return '';
		} else {
			return '$' + amount;
		}
	}

	public sum(array: IBudgetGroupLineItem[], itemToTotal: string): string {
		return array
			.reduce(
				(prev, lineItem): any =>
					prev + parseInt(lineItem[itemToTotal], 10),
				0
			)
			.toString();
	}

	/**
	 * @param amount the amount to be formatted
	 */
	public formatAmount(amount: string) {
		let num;
		const afterDec =
				'.' + amount.substring(amount.length - 2, amount.length),
			beforeDec = amount.substring(0, amount.length - 2),
			len = beforeDec.length;
		if (len >= 4) {
			let beforeComma, afterComma1, afterComma2;
			if (len >= 4 && len < 7) {
				beforeComma = beforeDec.substring(0, len - 3);
				afterComma1 = beforeDec.substring(len - 3, len);
				num = beforeComma + ',' + afterComma1;
			} else if (len === 7) {
				afterComma2 = beforeDec.substring(len - 3, len);
				afterComma1 = beforeDec.substring(len - 3, len - (len - 1));
				beforeComma = beforeDec.substring(0, len - (len - 1));
				num = beforeComma + ',' + afterComma1 + ',' + afterComma2;
			} else if (len === 8) {
				afterComma2 = beforeDec.substring(len - 3, len);
				afterComma1 = beforeDec.substring(len - 3, len - (len - 2));
				beforeComma = beforeDec.substring(0, len - (len - 2));
				num = beforeComma + ',' + afterComma1 + ',' + afterComma2;
			} else if (len === 9) {
				afterComma2 = beforeDec.substring(len - 3, len);
				afterComma1 = beforeDec.substring(len - 3, len - (len - 3));
				beforeComma = beforeDec.substring(0, len - (len - 3));
				num = beforeComma + ',' + afterComma1 + ',' + afterComma2;
			} else {
				console.warn(
					'Formatting amounts greater than 100 million are not supported.'
				);
				num = null;
			}
		}
		return this.addCurrencySymbol((num || beforeDec) + afterDec);
	}

	public addBudgetGroupLineItem(e) {
		const budgetGroup = e.target.parentNode,
			listPosition = budgetGroup.getAttribute('data-listposition');

		this.setState((state: any) => {
			return (state.finances.budget.budgetGroups[
				listPosition
			].lineItems = [
				...state.finances.budget.budgetGroups[listPosition].lineItems,
				{
					title: 'New Item',
					planned: '000',
					actual: '000',
					listPosition:
						state.finances.budget.budgetGroups[listPosition]
							.lineItems.length
				}
			]);
		});
	}

	public onLineItemTitleChange(event) {
		event.preventDefault();

		const groupNumber = event.target.getAttribute('data-groupnumber'),
			listPosition = event.target.getAttribute('data-listposition'),
			finances = this.state.finances,
			lineItem = this.state.finances.budget.budgetGroups[groupNumber]
				.lineItems[listPosition],
			newTitle = event.target.value;

		lineItem.title = newTitle;

		this.setState(() => {
			return {
				finances: { ...finances }
			};
		});
	}

	public updateDisplayedInBudgetPlus(event) {
		event.preventDefault();
		const app = this.state.app;
		app.budget.budgetPlus.display =
			event.target.getAttribute('title') || 'Graph';

		this.setState(() => {
			return {
				app: { ...app }
			};
		});
	}

	public updateBudgetGroupLineItemPosition(event) {
		try {
			const parents = this.getParents(event.target, [
				'BudgetGroup',
				'BudgetGroupLineItem',
				'BudgetGroupLineItem__options-btn'
			]);
			if (!parents) {
				throw new Error(
					'Unable to get parent elements of element clicked.'
				);
			}
			const title = parents[
					'BudgetGroupLineItem__options-btn'
				].getAttribute('title'),
				elementPosition = parseInt(
					parents['BudgetGroupLineItem'].getAttribute(
						'data-listposition'
					),
					10
				),
				budgetGroupListPosition = parseInt(
					parents['BudgetGroup'].getAttribute('data-listposition'),
					10
				),
				budgetGroupLineItemsState = this.state.finances.budget
					.budgetGroups[budgetGroupListPosition].lineItems;
			let removedElement;

			if (title === 'Move up list' && elementPosition !== 0) {
				[removedElement] = budgetGroupLineItemsState.splice(
					elementPosition,
					1
				);
				budgetGroupLineItemsState.splice(
					elementPosition - 1,
					0,
					removedElement
				);
				this.reOrderLineItems(budgetGroupListPosition, {
					updateFinancialState: true
				});
			} else if (
				title === 'Move down list' &&
				elementPosition !== budgetGroupLineItemsState.length
			) {
				[removedElement] = budgetGroupLineItemsState.splice(
					elementPosition,
					1
				);
				budgetGroupLineItemsState.splice(
					elementPosition + 1,
					0,
					removedElement
				);
				this.reOrderLineItems(budgetGroupListPosition, {
					updateFinancialState: true
				});
			} else {
				throw new Error('Cannot move item');
			}
		} catch (err) {
			console.error('Error in updateBudgetGroupLineItemPosition:', err);
		}
	}

	public deleteBudgetGroupLineItem(event) {
		try {
			const {
				BudgetGroup,
				BudgetGroupLineItem: lineItem
			}: any = this.getParents(event.target, [
				'BudgetGroup',
				'BudgetGroupLineItem'
			]);
			if (!lineItem) {
				throw new Error(
					'Unable to get parent elements of element clicked.'
				);
			}
			const lineItemListPosition = parseInt(
					lineItem.getAttribute('data-listposition'),
					10
				),
				budgetGroupListPosition = parseInt(
					BudgetGroup.getAttribute('data-listposition'),
					10
				),
				budgetGroupLineItemsInState = this.state.finances.budget
					.budgetGroups[budgetGroupListPosition].lineItems;

			budgetGroupLineItemsInState.splice(lineItemListPosition, 1);
			this.reOrderLineItems(budgetGroupListPosition, {
				updateFinancialState: true
			});
		} catch (err) {
			console.error('Error in deleteBudgetGroupLineItem:', err);
		}
	}

	private setFinancialState(finances) {
		this.setState(() => {
			return {
				finances: { ...finances }
			};
		});
	}

	private reOrderLineItems(
		budgetGroupNum: number,
		options: IReOrderLineItemsOptions
	) {
		const finances = this.state.finances;
		finances.budget.budgetGroups[budgetGroupNum].lineItems.map(
			(item: any, index: number) => {
				item.listPosition = index;
				return item;
			}
		);

		if (options.updateFinancialState) {
			this.setFinancialState(finances);
		}
	}
}

export default AppMain;
