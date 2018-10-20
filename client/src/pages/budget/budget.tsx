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

class Budget extends React.Component<IState> {
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

    const { budgetGroups } = this.finances.budget;
    const displayInBudgetPlusSection = this.props.state.app.budget.budgetPlus.display;

    return (
      <section className="Budget">
        <BudgetPageHeader {...{
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
                  calcTotals: group.header === 'income' ? true : false
                }} />
              )
            })
          }
        </ul>
        {this.showInBudgetPlus(displayInBudgetPlusSection)}
      </section>
    );
  }

  private showInBudgetPlus(displayInBudgetPlusSection) {
    if (displayInBudgetPlusSection === 'Transactions') {
      return <Transactions />
    } else if (displayInBudgetPlusSection === 'LineItemDetails') {
      return <LineItemDetails {...{
        lineItemDetails: this.props.state.app.budget.budgetPlus.lineItemDetails,
        methods: this.methods
      }}/>
    } else {
      return <BudgetGraph />
    }
  }
}

export default Budget;
