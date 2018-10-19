'use strict';

/**
 * Process: 
 * 1. sign in
 * 2. link account with Plaid
 * 
 * dev access_token: 'access-development-84ecf1ba-9cce-4b68-ab34-df51f3bb3e65'
 * dev item_id: 'JXeznEjAp3UKBXvJZZrOCKpRrBAmY9Sbn33MN'
 */

const express = require('express'),
	api = express(),
	Plaid = require('plaid'),
	plaidConfig = require('../plaid.config').hotmail,
	PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || plaidConfig.client_id,
	PLAID_ENV = process.env.PLAID_ENV || plaidConfig.environment,
	PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY || plaidConfig.public_key,
	secret = (() => {
		if (PLAID_ENV === 'production') {
		return plaidConfig.secrets.production;
		} else if (PLAID_ENV === 'development') {
		return plaidConfig.secrets.development;
		} else {
		// sandbox secret
		return plaidConfig.secrets.sandbox;
		}
	})(),
	PLAID_SECRET = process.env.PLAID_SECRET || secret,
	fakeData = require('../../sandbox/fakeTransactionData');

// Initialize the Plaid client
var client = new Plaid.Client(
	PLAID_CLIENT_ID,
	PLAID_SECRET,
	PLAID_PUBLIC_KEY,
	Plaid.environments[PLAID_ENV],
	{version: '2018-05-22'}
);


// We store the access_token in memory
// In production, store it in a secure persistent data store
var ACCESS_TOKEN = null;
var ITEM_ID = null;

module.exports = api.post('/plaid/get_access_token', function(req, res, next) {

	const PUBLIC_TOKEN = req.body.public_token;
	console.log('PUBLIC_TOKEN :', PUBLIC_TOKEN);

	client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
		if (error != null) {
			var msg = 'Could not exchange public_token!';
			console.log(msg + '\n' + JSON.stringify(error));
			return res.json({
				error: msg
			});
		}
		ACCESS_TOKEN = tokenResponse.access_token;
		ITEM_ID = tokenResponse.item_id;
		// console.log('tokenResponse :', tokenResponse);
		res.json({
			access_token: ACCESS_TOKEN,
			item_id: ITEM_ID,
			error: false
		});
	});
});

/**
 * Check balances in real time to prevent non-sufficient funds fees.
 */
module.exports = api.get('/plaid/balance', function(req, res, next) {
	client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
		if (error) {
			console.log('error :', error);
			return res.json({
				error: error,
			});
		}
		// console.log('authResponse :', authResponse);
		res.json({
			error: null, 
			auth: authResponse
		});
	});
});

/**
 * Retrieve account and routing numbers for ACH authentication. 
 * No micro-deposits required.
 */
module.exports = api.get('/plaid/auth', function(req, res, next) {
	client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
		if (error) {
			console.log('error :', error);
			return res.json({
				error: error,
			});
		}
		// console.log('authResponse :', authResponse);
		res.json({
			error: null, 
			auth: authResponse
		});
	});
});

/**
 * Clean transaction data going back as far as 24 months. 
 * Transaction data may include context such as geolocation, merchant, and category information.
 */
module.exports = api.get('/plaid/transactions', (req, res, next) => {
	// Pull transactions for the Item for the last 30 days
	var startDate = '2018-09-01';// moment().subtract(30, 'days').format('YYYY-MM-DD');
	var endDate = '2018-09-30'; // moment().format('YYYY-MM-DD');

	client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
			count: 250,
			offset: 0,
		}, (error, transactionsResponse) => {
			if (error != null) {
				console.log('error :', error);
				return res.json({
					error: error
				});
			} else {
				// console.log('transactionsResponse :', transactionsResponse);
				res.json({
					error: false, 
					transactions: transactionsResponse
				});
			}
	});
});



module.exports = api.post('/api/get/transactions', (req, res, next) => {
	// Pull transactions for the Item for the last 30 days
	var startDate = '2018-09-01';// moment().subtract(30, 'days').format('YYYY-MM-DD');
	var endDate = '2018-09-30'; // moment().format('YYYY-MM-DD');

	console.log('req.body :', req.body.access_token);

	client.getTransactions(req.body.access_token, startDate, endDate, {
			count: 250,
			offset: 0,
		}, (error, transactionsResponse) => {
			if (error != null) {
				console.log('error :', error);
				return res.json({
					error: error
				});
			} else {
				// console.log('transactionsResponse :', transactionsResponse);
				res.json({
					error: false, 
					transactions: transactionsResponse
				});
			}
	});
});


module.exports = api.get('/api/get_fake_data', (req, res, next) => {
	res.json({
		error: false,
		transactions: fakeData
	})
});