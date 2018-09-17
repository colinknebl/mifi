import React, { Component } from 'react';
import './budget.css';

import TopBar from '../../components/Budget/TopBar/topbar';
import SideBar from '../../components/Budget/SideBar/sidebar';
import BudgetHeader from '../../components/Budget/BudgetHeader/budgetHeader';

class Budget extends Component {
  constructor(routerProps) {
    super();
    this.routerProps = routerProps
  }
  render() {
    return (
      <main className="Budget">
        <TopBar />
        <SideBar />
        <BudgetHeader />
        {/* <Categories /> */}
        {/* <Summary />
        <Footer /> */}
      </main>
    );
  }
}

export default Budget;