export default {
	// TODO: move these into state.app
	fetchedUser: null,
	isLoading: true,
	// =============================
	app: {
		budget: {
			budgetPlus: {
				display: 'Graph',
				lineItemDetails: null
			}
		}
	},
	user: {
		id: 'fdafeoaidnf8e2tlhqeg',
		firstName: 'Colin',
		lastName: 'Knebl',
		email: 'colin.knebl@outlook.com',
		newUser: false,
		signupDate: 'Wed Aug 1 2017 09:53:39 GMT-0400 (Eastern Daylight Time)',
		lastLogin: null,
		settings: {
			currency: 'USD'
		},
		accessToken: ['access-sandbox-e94b818a-24be-4fa6-b64f-1abe2a082b18'],
		lastBudgetState: {
			monthSelector: {
				month: 8,
				year: 2018
			}
		}
	},
	finances: {
		banks: [{ name: 'USAA' }, { name: 'Lake Michigan Credit Union' }],
		transactions: [
			{
				id: 'asdf3ro9haflqkef0',
				amount: {
					usd: -120.19
				},
				date: '2018-09-19',
				description: 'MEIJER #232        Q01   MUSKEGO',
				externalBankID: 'fn45984204',
				externalTransactionID: 'fn6888261429',
				ignored: false,
				merchant: 'Meijer',
				allocated: []
			}
		],
		budget: {
			budgetGroups: [
				{
					id: 'q230r9ugaoidnfgq30rg9',
					header: 'income',
					draggable: false,
					addable: true,
					minimized: false,
					maxLineItems: 20,
					listPosition: 0,
					lineItems: [
						{
							id: 'faoq243t;nqfo[q4t',
							title: '2020 Paycheck 1 (9/6)',
							planned: 197740,
							actual: 197740,
							listPosition: 0,
							note: null,
							assignedTransactions: null,
							isFund: false
						},
						{
							id: 'wqrt90h4gfneg3qrg',
							title: '2020 Paycheck 2 (9/20)',
							planned: 163742,
							actual: 163742,
							listPosition: 1,
							note: null,
							assignedTransactions: null,
							isFund: false
						},
						{
							id: 'foiawne4tpo8q4htp;',
							title: 'Drill Pay 9/18',
							planned: 37689,
							actual: 37689,
							listPosition: 2,
							note: null,
							assignedTransactions: null,
							isFund: false
						}
					]
				},
				{
					id: 'oqi23rtoiwqenf[pqi4',
					header: 'tithing',
					draggable: true,
					addable: true,
					minimized: false,
					maxLineItems: 20,
					listPosition: 1,
					lineItems: [
						{
							id: 'wqrt90asdf2523rcneg3qrg',
							title: 'Tithing',
							planned: 0,
							actual: 0,
							listPosition: 0,
							note: null,
							assignedTransactions: null,
							isFund: false
						}
					]
				},
				{
					id: 'fadpm24t',
					header: 'retirement',
					draggable: true,
					addable: true,
					minimized: true,
					maxLineItems: 20,
					listPosition: 2,
					lineItems: [
						{
							id: 'f2q940th3p48threg',
							title: 'Retirement Fund',
							planned: 0,
							actual: 0,
							listPosition: 0,
							note: null,
							assignedTransactions: null,
							isFund: true
						}
					]
				},
				{
					id: 'adfopimn248hgqweg',
					header: 'surplus',
					draggable: true,
					addable: true,
					minimized: false,
					maxLineItems: 20,
					listPosition: 3,
					lineItems: [
						{
							id: 'afo89q4thfffdaf',
							title: 'Surplus',
							planned: 30000,
							actual: 24000,
							listPosition: 0,
							note: null,
							assignedTransactions: null,
							isFund: true
						}
					]
				},
				{
					id: '98hqrkljhqetpo8q4t',
					header: 'bills',
					draggable: true,
					addable: true,
					minimized: false,
					maxLineItems: 20,
					listPosition: 4,
					lineItems: [
						{
							id: 'fsda;oinfa7829fkjna',
							title: 'Xfinity',
							planned: 7999,
							actual: 7999,
							listPosition: 0,
							note: null,
							assignedTransactions: null,
							isFund: true
						},
						{
							id: 'doijw7777adufhq4trd',
							title: 'Water',
							planned: 999,
							actual: 0,
							listPosition: 1,
							note: null,
							assignedTransactions: null,
							isFund: false
						}
					]
				}
			]
		}
	}
};
