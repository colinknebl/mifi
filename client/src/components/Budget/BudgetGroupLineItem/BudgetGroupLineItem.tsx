import * as React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import './BudgetGroupLineItem.css';

import { IBudgetGroupLineItem } from '../../../mifi';

class BudgetGroupLineItem extends React.Component {
    public props: IBudgetGroupLineItem;
    public id: string;

    constructor(props: IBudgetGroupLineItem) {
        super(props)
        this.id = Date.now() + this.props.actual.toString();
    }
    
    public render() {
        const { title, listPosition, methods: { financial: fn } } = this.props,
              planned = fn.formatAmount(this.props.planned),
              actual = fn.formatAmount(this.props.actual);

        return (
            <li className="BudgetGroupLineItem js-BudgetGroupLineItem--parent" data-listposition={listPosition}>
                <input type="text" 
                    className="BudgetGroupLineItem__input BudgetGroupLineItem--editable js-BudgetGroupLineItem--child"
                    data-groupnumber={this.props.budgetGroupBelongsTo} 
                    data-listposition={this.props.listPosition} 
                    value={title} 
                    onChange={fn.onLineItemTitleChange} />
                <input type="text"
                    className="BudgetGroupLineItem__input BudgetGroupLineItem__input--right BudgetGroupLineItem--editable js-BudgetGroupLineItem--child" 
                    value={planned}
                    onChange={fn.onLineItemTitleChange} />
                <input type="text"
                    className="BudgetGroupLineItem__input BudgetGroupLineItem__input--right" 
                    value={actual}
                    readOnly={true} />
                <span id={this.id} className="BudgetGroupLineItem__progress" />
                <button
                    className="BudgetGroupLineItem__options-btn BudgetGroupLineItem__options-btn--trash"
                    onClick={fn.deleteBudgetGroupLineItem}
                    title="Delete from list"><i className="fa fa-trash-o"/></button>
                <button 
                    className="BudgetGroupLineItem__options-btn BudgetGroupLineItem__options-btn--up"
                    onClick={fn.updateBudgetGroupLineItemPosition} 
                    title="Move up list"><i className="fa fa-plus" /></button>
                <button 
                    className="BudgetGroupLineItem__options-btn BudgetGroupLineItem__options-btn--down"
                    onClick={fn.updateBudgetGroupLineItemPosition} 
                    title="Move down list"><i className="fa fa-minus" /></button>
            </li>
        );
    }

    public componentDidMount() {
        const planned = parseInt(this.props.actual.toString(), 10),
              actual = parseInt(this.props.planned.toString(), 10);
        let percent, el;

        if (planned > 0) {
            percent = ((actual / planned) * 100) > 100 ? 100 : (actual / planned) * 100;
            el = document.getElementById(this.id);
            if (el) { 
                el.style.width = percent.toString() + '%';
                el.style.borderColor = 'var(--pri-color)';
            }
        }
    }
}

export default BudgetGroupLineItem;