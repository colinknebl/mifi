const express = require('express'),
      api = express(),
      fetch = require('node-fetch');

module.exports = api.get('/getUser', (req, res) => {

  fetch('http://localhost:9000/db')
    .then(json => json.json())
    .then(user => {
        console.log('user', user);

        res.json({
          user
        });

    });
});