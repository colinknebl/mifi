import * as React from 'react';

import BudgetGraph from '../../components/Budget/BudgetGraph';
import BudgetGroup from '../../components/Budget/BudgetGroup';
import BudgetPageHeader from '../../components/Budget/BudgetPageHeader';
import LineItemDetails from '../../components/Budget/LineItemDetails';
import Transactions from '../../components/Budget/Transactions';

import { IBudgetGroup } from '../../typescript/interfaces/mifi';

// interface IState {
// 	state: any
// }

// interface IProps {
// 	props: any
// }

class Budget extends React.Component<any, any> {
	public user: any;
	public methods: any;
	public state: any = {
		budgetGroups: {}
	}
	private orderBudgetGroups: boolean;

	constructor(props: any) {
		super(props);
		console.log('props', props);

		// this.user = props.state.user;
		this.methods = props.methods;
		this.orderBudgetGroups = true;

		this.state.budgetGroups = props.state.finances.budget.budgetGroups;
	}
	public render() {

		const budgetGroups = this.orderBudgetGroups ? this.methods.financial.orderItems(this.state.budgetGroups) : this.state.budgetGroups,
			displayInBudgetPlusSection = this.props.state.app.budget.budgetPlus.display;

		this.orderBudgetGroups = false;

		return (
			<section className="Budget">
				<BudgetPageHeader {...{
					state: this.props.state,
					methods: this.methods
				}} />
				
				<ul className="BudgetGroupList">
					{
						budgetGroups.map((group: IBudgetGroup, num: number) => {
							return (
								<BudgetGroup key={num} methods={this.methods} {...{
									minimized: group.minimized,
									addable: group.addable,
									draggable: group.draggable,
									header: group.header,
									lineItems: group.lineItems,
									maxLineItems: group.maxLineItems,
									listPosition: group.listPosition,
									calcTotals: group.header === 'income' ? true : false,
									budgetGroupListPosition: group.listPosition
								}} />
							)
						})
					}
				</ul>
				{this.showInBudgetPlus(displayInBudgetPlusSection)}
			</section>
		);
	}

	public componentDidMount() {
		const self = this,
			budgetGroups = Array.from(document.getElementsByClassName('BudgetGroup')),
			[bgl] = Array.from(document.getElementsByClassName('BudgetGroupList')),
			list = document.querySelector('.BudgetGroupList');

		let target;

		if (budgetGroups) {
			budgetGroups.forEach((group => {

				group.addEventListener('dragstart', function(this: any, event) {
					target = this;
					this.classList.add('BudgetGroup--dragged');
					bgl.classList.add('BudgetGroupList--dragging');
				}, false);

				group.addEventListener('dragenter', function(this: any, event) {
					if (this.getAttribute('draggable') === 'true' && this.getAttribute('data-header') !== target.getAttribute('data-header')) {
						if (list) {
							if (this.getAttribute('data-listposition') > target.getAttribute('data-listposition')) {
								list.insertBefore(target, this.nextSibling);
							} else {
								list.insertBefore(target, this);
							}
						}
					}
				}, false);

				group.addEventListener('dragend', function(this: any, event) {
					bgl.classList.remove('BudgetGroupList--dragging');
					this.classList.remove('BudgetGroup--dragged');

					Array.from(bgl.children).forEach((grp, i) => {
						grp.setAttribute('data-listposition', i.toString())
					});

					self.methods.financial.reorderBudgetGroups(bgl)
				}, false);
			}))
		}
	}

	private showInBudgetPlus(displayInBudgetPlusSection) {
		if (displayInBudgetPlusSection === 'Transactions') {
			return <Transactions />
		} else if (displayInBudgetPlusSection === 'LineItemDetails') {
			return <LineItemDetails {...{
				state: this.props.state,
				methods: this.methods
			}}/>
		} else {
			return <BudgetGraph />
		}
	}
}

export default Budget;
