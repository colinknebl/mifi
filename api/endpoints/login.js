const express = require('express'),
      api = express(),
      fetch = require('node-fetch'),
      MongoClient = require('mongodb').MongoClient,
	  ObjectId = require('mongodb').ObjectId,
	  assert = require('assert'),
      mongoUrl = require('../mongo.config').url;

module.exports = api.post('/api/login', (req, res) => {
  
	console.log('req.body :', req.body);

	if (!req.body) {
		res.json({
			error: 'No body in request'
		});
	}
    

    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        
        const query = {
            username: req.body.username,
            password: req.body.password
        }
        console.log('query :', query);
        const collection = client.db("mifi").collection("users");

        collection.find(query).toArray((err, user) => {

            console.log('user :', user);
            
            if (user) {
                res.json({
                    error: null,
                    user: user,
                    redirectUrl: '/app/dashboard'
                });
            } else {
                res.json({
                    error: err
                })
            }
        })
        client.close();
    });

//   fetch('http://localhost:9000/db')
//     .then(json => json.json())
//     .then(user => {
//         console.log('user', user);

//         res.json({
//             user
//         });

//     });
});


/*
[{
    username: 'will1',
    password: 'smith1',
    firstName: 'Will',
    lastName: 'Smith',
    email: 'willsmith@dispostable.com',
    access_token: '',
    item_id: '',
    settings: {
        currency: 'USD'
    }
}, {
    username: 'colinknebl',
    password: 'password',
    firstName: 'Colin',
    lastName: 'Knebl',
    email: 'colin.knebl@outlook.com',
    access_token: 'access-development-84ecf1ba-9cce-4b68-ab34-df51f3bb3e65',
    item_id: 'JXeznEjAp3UKBXvJZZrOCKpRrBAmY9Sbn33MN',
    settings: {
        currency: 'USD'
    }
}]
*/
