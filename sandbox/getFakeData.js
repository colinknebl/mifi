const Plaid = require('plaid');

var startDate = '2018-09-01';// moment().subtract(30, 'days').format('YYYY-MM-DD');
var endDate = '2018-09-30'; // moment().format('YYYY-MM-DD');

var client = new Plaid.Client(
	'5bb94b79a8a54c00122828b8',
	'80301e109c00000284272bc54db332',
	'8a8e45e2715eb1df253d38aafb4460',
	Plaid.environments['development'],
	{version: '2018-05-22'}
);

client.getTransactions('access-development-84ecf1ba-9cce-4b68-ab34-df51f3bb3e65', startDate, endDate, {
        count: 250,
        offset: 0,
    }, (error, transactionsResponse) => {
        if (error != null) {
            console.log('error :', error);
            return res.json({
                error: error
            });
        } else {
            console.log('transactionsResponse :', transactionsResponse);
        }
});