import * as React from 'react';
import './BudgetPageHeader.css';

import MonthSelector from '../MonthSelector/monthSelector';
import TransactionHeaderIcon from '../TransactionHeaderIcon/TransactionHeaderIcon';

class BudgetPageHeader extends React.Component {
  public onClick: () => void;

  constructor(props) {
    super(props);

    this.onClick = props.methods.financial.updateDisplayedInBudgetPlus
  }
    
  public render() {
    return (
      <section className="BudgetPageHeader">
        <MonthSelector />
        <p className="MonthSelector__left-to-budget"><span className="font--dark">$500.00</span> <span className="font--light">left to budget</span></p>
        <TransactionHeaderIcon {...{
          onClick: this.onClick
        }} />
      </section>
    );
  }
}

export default BudgetPageHeader;