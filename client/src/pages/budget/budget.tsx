import * as React from 'react';
import './budget.css';

import BudgetGroup from '../../components/Budget/BudgetGroup/BudgetGroup';
import BudgetPageHeader from '../../components/Budget/BudgetPageHeader/BudgetPageHeader';

import { IBudgetGroup } from '../../mifi';

class Budget extends React.Component {
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

    return (
      <section className="Budget">
        <BudgetPageHeader />
        
        <ul className="BudgetGroupList">
          {
            budgetGroups.map((group: IBudgetGroup, num: number) => {
              return (
                <BudgetGroup key={num} methods={this.methods} {...{
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

        <section>
          <h4>graph section</h4>
        </section>
      </section>
    );
  }
}

export default Budget;