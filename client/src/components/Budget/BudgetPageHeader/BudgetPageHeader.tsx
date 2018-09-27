import * as React from 'react';
import './BudgetPageHeader.css';

import MonthSelector from '../MonthSelector/monthSelector';

class BudgetPageHeader extends React.Component {
    
  public render() {
    return (
      <section className="BudgetPageHeader">
        <MonthSelector />
        <p className="MonthSelector__left-to-budget"><span className="font--dark">$500.00</span> <span className="font--light">left to budget</span></p>
      </section>
    );
  }
}

export default BudgetPageHeader;