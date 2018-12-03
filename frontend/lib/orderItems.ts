/**
 * Orders items based on their listPosition
 * @param items array
 */
export default function orderItems(items: Array<any>) {
	const sortedItems = items.sort((itemA, itemB) => {
		if (itemA.listPosition < itemB.listPosition) {
			return -1;
		} else if (itemA.listPosition > itemB.listPosition) {
			return 1;
		} else {
			return 0;
		}
	});
	const numneredAndOrderedItems = sortedItems.map((item, i) => {
		item.listPosition = i;
		return item;
	});
	return numneredAndOrderedItems;
}
