import * as React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import './BudgetGroupLineItem.css';

import { IBudgetGroupLineItem } from '../../../mifi';

class BudgetGroupLineItem extends React.Component {
    public props: IBudgetGroupLineItem;
    public progressBarId: string;
    public lineItemId: string;

    constructor(props: IBudgetGroupLineItem) {
        super(props)
        this.lineItemId = Date.now() + this.props.actual.toString() + '-line-item';
        this.progressBarId = Date.now() + this.props.actual.toString() + '-progress-bar';
    }
    
    public render() {
        const { title, listPosition, methods: { financial: fn } } = this.props,
              planned = fn.formatAmount(this.props.planned),
              actual = fn.formatAmount(this.props.actual);
        
        return (
            <li
                id={this.lineItemId}
                className="BudgetGroupLineItem js-BudgetGroupLineItem--parent" 
                data-listposition={listPosition}
                onClick={fn.lineItemClicked} >
                {
                    this.props.isFund ? <i className="fa fa-university BudgetGroupLineItem__fund-icon" /> : null
                }
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
                    className="BudgetGroupLineItem__input BudgetGroupLineItem__input--right js-BudgetGroupLineItem--child" 
                    value={actual}
                    readOnly={true} />
                <span id={this.progressBarId} className="BudgetGroupLineItem__progress" />
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
        const el = document.getElementById(this.progressBarId);
        this.fillInProgressBar(el);

        if (this.props.isFund) {
            const li = document.getElementById(this.lineItemId);
            if (li) {
                li.classList.add('BudgetGroupLineItem--fund');
            }
        }
    }

    public fillInProgressBar(el) {
        const planned = parseInt(this.props.actual.toString(), 10),
              actual = parseInt(this.props.planned.toString(), 10);
        let percent;

        if (planned > 0) {
            percent = ((actual / planned) * 100) > 100 ? 100 : (actual / planned) * 100;
            if (el) { 
                el.style.width = percent.toString() + '%';
                el.style.borderColor = 'var(--pri-color)';
            }
        }
    }
}

export default BudgetGroupLineItem;