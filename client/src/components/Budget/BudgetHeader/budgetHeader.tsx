import * as React from 'react';
import './budgetHeader.css';

import MonthSelector from '../MonthSelector/monthSelector';

class BudgetHeader extends React.Component {
    
  public render() {
    return (
      <section className="BudgetHeader">
        <MonthSelector />
      </section>
    );
  }
}

export default BudgetHeader;