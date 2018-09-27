import * as React from 'react';
import './BudgetGroup.css';

import BudgetGroupLineItem from '../BudgetGroupLineItem/BudgetGroupLineItem';

import { IBudgetGroup, IBudgetGroupLineItem } from '../../../mifi';

class BudgetGroup extends React.Component {
  public props: IBudgetGroup;
    
  public render() {

    const { header, lineItems, methods: { financial: fn }, calcTotals } = this.props;
    const plannedSum = fn.formatAmount(fn.sum(this.props.lineItems, 'planned'));
    const receivedSum = fn.formatAmount(fn.sum(this.props.lineItems, 'actual'));

    return (
      <li className="BudgetGroup" data-header={header} data-listposition={this.props.listPosition} >
        <h6 className="BudgetGroup__header font--dark">{header.toUpperCase()}</h6>
        <span className="BudgetGroup__column--right column-header__planned font--light">Planned</span>
        <span className="BudgetGroup__column--right column-header__received font--light">{
          header === 'income' ? 'Received' : 'Remaining'
        }</span>
        <ul className="BudgetGroup__line-item-list">
          {
            lineItems.map((lineItem: IBudgetGroupLineItem, num: number) => {
              return <BudgetGroupLineItem key={num} methods={this.props.methods} {...{
                actual: lineItem.actual,
                planned: lineItem.planned,
                title: lineItem.title,
                listPosition: lineItem.listPosition,
                budgetGroupBelongsTo: this.props.listPosition
              }} />
            })
          }
        </ul>
        {calcTotals
          ? <Totals 
            plannedSum={plannedSum} receivedSum={receivedSum} 
            onAddClick={this.props.methods.financial.addBudgetGroupLineItem} /> 
          : <AddItemBtn 
            onClick={this.props.methods.financial.addBudgetGroupLineItem} />}
      </li>
    );
  }
}

export default BudgetGroup;


function Totals(props: any): any {
  return (
    <React.Fragment>
      <AddItemBtn onClick={props.onAddClick} />
      <span className="BudgetGroup__column--right">{props.plannedSum}</span>
      <span className="BudgetGroup__column--right">{props.receivedSum}</span>
    </React.Fragment>
  )
}

function AddItemBtn(props: any) {
  return (
    <button className="BudgetGroup__add-item-btn" onClick={props.onClick}>+ Add Item</button>
  )
}