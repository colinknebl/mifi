import * as React from 'react';
import './budget.css';

import BudgetGraph from '../../components/Budget/BudgetGraph/BudgetGraph';
import BudgetGroup from '../../components/Budget/BudgetGroup/BudgetGroup';
import BudgetPageHeader from '../../components/Budget/BudgetPageHeader/BudgetPageHeader';
import LineItemDetails from '../../components/Budget/LineItemDetails/LineItemDetails';
import Transactions from '../../components/Budget/Transactions/Transactions';

import { IBudgetGroup } from '../../mifi';

interface IState {
	state: any
}

interface IProps {
	props: any
}

class Budget extends React.Component<IState, IProps> {
	public user: any;
	public methods: any;
	private finances: any;

	constructor(props: any) {
		super(props);

		this.user = props.state.user;
		this.finances = props.state.finances;
		this.methods = props.methods;
	}
	public render() {

		const budgetGroups = this.methods.financial.orderItems(this.finances.budget.budgetGroups),
			displayInBudgetPlusSection = this.props.state.app.budget.budgetPlus.display;

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
			budgetGroupFillerDivs = Array.from(document.getElementsByClassName('BudgetGroup__filler-div'));

		let marginVal,
			target,
			dragOverTarget,
			styleSheet;
		
		const addRule = (style, selector, css) => {
			style.id = 'BudgetGroup--drag-styles';
			// @ts-ignore
			const sheet = document.head.appendChild(style).sheet;
			const propText = typeof css === "string" ? css : Object.keys(css).map((cssKey) => {
				return `${cssKey}:` + (cssKey === "content" ? `'${css[cssKey]}'` : css[cssKey]);
			}).join(";");
			sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
			styleSheet = document.getElementById('BudgetGroup--drag-styles');
		};

		if (budgetGroups) {
			budgetGroups.forEach((group => {

				group.addEventListener('dragstart', function(this: any, event) {
					target = event.target;
					marginVal = this.clientHeight;

					bgl.classList.add('BudgetGroupList--dragging');
					if (event && event.target) {
						setTimeout(() => target.classList.add('BudgetGroup--drag-target'), 0);
					}

					budgetGroupFillerDivs.forEach((div: any) => {
						div.style.display = 'block';
					});
				}, false);

				group.addEventListener('dragenter', function(this: any, event) {
					if (this.getAttribute('draggable') === 'true' && this.getAttribute('data-header') !== target.getAttribute('data-header')) {
						const hoverTargetListPosition = this.getAttribute('data-listposition'),
							dragTargetListPosition = target.getAttribute('data-listposition');
						let marginDirection;

						if (styleSheet) {
							styleSheet.remove();
						}
						const cssRules: any = {
							content: '',
							'border-radius': 'var(--budget-group-border-radius)',
							position: 'absolute',
							width: '100%',
							height: `${marginVal}px`,
							background: 'rgb(231, 249, 255)',
							'z-index': '1'
						}

						if (hoverTargetListPosition < dragTargetListPosition) {
							cssRules.top =  `-${marginVal + 13}px`;
							marginDirection = 'top';
						} else {
							cssRules.bottom = `-${marginVal + 13}px`;
							marginDirection = 'bottom';
						}
						addRule(document.createElement("style"), ".BudgetGroup--drag-over-target:before", cssRules);

						if (dragOverTarget) {
							dragOverTarget.style.marginTop = '';
							dragOverTarget.style.marginBottom = '';
							dragOverTarget.classList.remove('BudgetGroup--drag-over-target');
						}

						if (marginDirection === 'top') {
							this.style.marginTop = marginVal + 10 + 'px';
						} else {
							this.style.marginBottom = marginVal + 10 + 'px';
						}
						dragOverTarget = this;
						this.classList.add('BudgetGroup--drag-over-target');
					}
				}, false);

				group.addEventListener('dragleave', function(this: any, event) {
					if (dragOverTarget) {
						dragOverTarget.style.marginTop = '';
						dragOverTarget.style.marginBottom = '';
						dragOverTarget.classList.remove('BudgetGroup--drag-over-target');
					}
				}, false);

				group.addEventListener('dragend', function(this: any, event) {
					bgl.classList.remove('BudgetGroupList--dragging');
					this.classList.remove('BudgetGroup--drag-target');
					self.methods.financial.reorderBudgetGroups(this, dragOverTarget, true);

					budgetGroupFillerDivs.forEach((div: any) => {
						div.style.display = 'none';
					});

					if (styleSheet) {
						styleSheet.remove();
					}

					if (dragOverTarget) {
						dragOverTarget.style.marginTop = '';
						dragOverTarget.classList.remove('BudgetGroup--drag-over-target');
						dragOverTarget = null;
					}
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
