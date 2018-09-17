import React, { Component } from 'react';
import './budgetHeader.css';
import 'font-awesome/css/font-awesome.min.css';
// import { Link } from 'react-router-dom';

import MonthSelector from '../MonthSelector/monthSelector';

class BudgetHeader extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <section className="BudgetHeader">
        <MonthSelector />
      </section>
    );
  }
}

export default BudgetHeader;