export interface IBudgetGroup {
    header: string;
    draggable: boolean;
    addable: boolean;
    minimized: boolean;
    maxLineItems: number;
    lineItems: IBudgetGroupLineItem[];
    calcTotals: boolean;
    listPosition: number;
    methods?: any;
}

export interface IBudgetGroupLineItem {
    title: string;
    planned: number;
    actual: number;
    listPosition: number;
    budgetGroupBelongsTo: number;
    methods?: any;
}

export interface IReOrderLineItemsOptions {
    updateFinancialState: boolean;
}
