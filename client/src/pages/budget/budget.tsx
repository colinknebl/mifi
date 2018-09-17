import * as React from 'react';
import './budget.css';

import BudgetHeader from '../../components/Budget/BudgetHeader/budgetHeader';
import SideBar from '../../components/Budget/SideBar/sidebar';
import TopBar from '../../components/Budget/TopBar/topbar';

class Budget extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }
  public render() {
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