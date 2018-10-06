'use strict';

/**
 * Process: 
 * 1. sign in
 * 2. link account with Plaid
 * 
 */

const express = require('express'),
	api = express(),
	Plaid = require('plaid'),
	plaidConfig = require('../plaid.config'),
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
	PLAID_SECRET = process.env.PLAID_SECRET || secret;

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
	console.log('PUBLIC_TOKEN', PUBLIC_TOKEN);

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