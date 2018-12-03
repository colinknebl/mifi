/**
 * Formats a number in cents to dollars or other desired currency
 * @param amount the amount to be formatted
 * @param currency the desired currency; if no paramater is passed the default is 'USD'
 */
export default function formatMoney(amount: number, currency: string = 'USD') {
	const options = {
		style: 'currency',
		currency,
		minimumFractionDigits: 2
	};
	const formatter = new Intl.NumberFormat('en-US', options);
	return formatter.format(amount / 100);
}
