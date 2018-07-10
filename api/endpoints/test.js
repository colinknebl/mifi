const express = require('express'),
      api = express();

api.get('/test', (req, res) => {
  res.json({
    success: true,
    test: true
  })
})

module.exports = api