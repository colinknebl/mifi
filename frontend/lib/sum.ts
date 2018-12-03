import { IBudgetGroupLineItem } from '../typescript/interfaces/mifi';

/**
 * Calculates the sum of a particular item in budget group line items
 * @param array an array of budget group line items
 * @param itemToTotal the item to total
 * @returns string
 */

export default function sum(
	array: IBudgetGroupLineItem[],
	itemToTotal: string
): number {
	return array
		.reduce(
			(prev, lineItem): any => prev + parseInt(lineItem[itemToTotal], 10),
			0
		)
		.toString();
}
