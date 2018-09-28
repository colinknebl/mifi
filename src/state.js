exports.handler = function(event, context, callback) {
    callback(null, {
        statusCode: 200, 
        body: JSON.stringify({
            fetchedUser: null,
            isLoading: true,
            user: {
                firstName: 'Colin',
                lastName: 'Knebl',
                email: 'colin.knebl@outlook.com',
                settings: {
                    currency: 'USD'
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
                            draggable: true,
                            addable: true,
                            maxLineItems: 20,
                            listPosition: 0,
                            lineItems: [
                                {
                                    title: '2020 Paycheck 1 (9/6)',
                                    planned: '197740',
                                    actual: '197740',
                                    listPosition: 0
                                },
                                {
                                    title: '2020 Paycheck 2 (9/20)',
                                    planned: '163742',
                                    actual: '163742',
                                    listPosition: 1
                                },
                                {
                                    title: 'Drill Pay 9/18',
                                    planned: '37689',
                                    actual: '37689',
                                    listPosition: 2
                                }
                            ]
                        },
                        {
                            header: 'tithing',
                            draggable: true,
                            addable: true,
                            maxLineItems: 20,
                            listPosition: 1,
                            lineItems: [
                                {
                                    title: 'Tithing',
                                    planned: '000',
                                    actual: '000',
                                    listPosition: 0
                                }
                            ]
                        },
                        {
                            header: 'retirement',
                            draggable: true,
                            addable: true,
                            maxLineItems: 20,
                            listPosition: 2,
                            lineItems: [
                                {
                                    title: 'Retirement Fund',
                                    planned: '000',
                                    actual: '000',
                                    listPosition: 0
                                }
                            ]
                        }
                    ]
                }
            }
        })
    });
}




