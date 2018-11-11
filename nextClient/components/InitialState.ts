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
        banks: [
            { name: 'USAA' },
            { name: 'Lake Michigan Credit Union' }
        ],
        transactions: [
            { 
                amount: { 
                    usd: -120.19
                },
                date: '2018-09-19',
                description: 'MEIJER #232        Q01   MUSKEGO',
                externalBankID: "fn45984204",
                externalTransactionID: "fn6888261429",
                ignored: false,
                merchant: "Meijer",
                allocated: []
            }
        ],
        budget: {
            budgetGroups: [
                {
                    header: 'income',
                    draggable: false,
                    addable: true,
                    minimized: false,
                    maxLineItems: 20,
                    listPosition: 0,
                    lineItems: [
                        {
                            title: '2020 Paycheck 1 (9/6)',
                            planned: '197740',
                            actual: '197740',
                            listPosition: 0,
                            note: null,
                            assignedTransactions: null,
                            isFund: false
                        },
                        {
                            title: '2020 Paycheck 2 (9/20)',
                            planned: '163742',
                            actual: '163742',
                            listPosition: 1,
                            note: null,
                            assignedTransactions: null,
                            isFund: false
                        },
                        {
                            title: 'Drill Pay 9/18',
                            planned: '37689',
                            actual: '37689',
                            listPosition: 2,
                            note: null,
                            assignedTransactions: null,
                            isFund: false
                        }
                    ]
                },
                {
                    header: 'tithing',
                    draggable: true,
                    addable: true,
                    minimized: false,
                    maxLineItems: 20,
                    listPosition: 1,
                    lineItems: [
                        {
                            title: 'Tithing',
                            planned: '000',
                            actual: '000',
                            listPosition: 0,
                            note: null,
                            assignedTransactions: null,
                            isFund: false
                        }
                    ]
                },
                {
                    header: 'retirement',
                    draggable: true,
                    addable: true,
                    minimized: true,
                    maxLineItems: 20,
                    listPosition: 2,
                    lineItems: [
                        {
                            title: 'Retirement Fund',
                            planned: '000',
                            actual: '000',
                            listPosition: 0,
                            note: null,
                            assignedTransactions: null,
                            isFund: true
                        }
                    ]
                },
                {
                    header: 'surplus',
                    draggable: true,
                    addable: true,
                    minimized: false,
                    maxLineItems: 20,
                    listPosition: 3,
                    lineItems: [
                        {
                            title: 'Surplus',
                            planned: '30000',
                            actual: '24000',
                            listPosition: 0,
                            note: null,
                            assignedTransactions: null,
                            isFund: true
                        }
                    ]
                },
                {
                    header: 'bills',
                    draggable: true,
                    addable: true,
                    minimized: false,
                    maxLineItems: 20,
                    listPosition: 4,
                    lineItems: [
                        {
                            title: 'Xfinity',
                            planned: '7999',
                            actual: '7999',
                            listPosition: 0,
                            note: null,
                            assignedTransactions: null,
                            isFund: true
                        },
                        {
                            title: 'Water',
                            planned: '999',
                            actual: '000',
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
}