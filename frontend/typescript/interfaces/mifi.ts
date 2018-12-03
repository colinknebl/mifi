export interface IBudgetGroup {
	id: String;
	header: string;
	draggable: boolean;
	addable: boolean;
	minimized: boolean;
	maxLineItems: number;
	lineItems: IBudgetGroupLineItem[];
	calcTotals: boolean;
	listPosition: number;
	methods?: any;
	budgetGroupListPosition: number;
}

export interface IBudgetGroupLineItem {
	id: String;
	title: string;
	planned: number;
	actual: number;
	listPosition: number;
	budgetGroupBelongsTo: number;
	note: string;
	isFund: boolean;
	methods?: any;
	budgetGroupListPosition: number;
}

export interface IReOrderLineItemsOptions {
	updateFinancialState: boolean;
}
