const express = require('express'),
      api = express(),
      fetch = require('node-fetch');

module.exports = api.post('/test', (req, res) => {
  
	console.log('req.body :', req.body);

	if (!req.body) {
		res.json({
			error: 'No body in request'
		});
	} else {
		res.json({
			error: null,
			username: req.body.username,
			password: req.body.password
		})
	}


  // fetch('http://localhost:9000/db')
  //   .then(json => json.json())
  //   .then(user => {
  //       console.log('user', user);

  //       res.json({
  //         user
  //       });

  //   });
});