const express = require('express'),
      api = express(),
      fs = require('fs'),
      config = require('./config');

fs.readdirSync(config.endpointsDir).forEach(file => {
  api.use(require(`${config.endpointsDir}${file}`))
})

api.listen(config.port, () => {
  console.log(`API listening on port ${config.port}`);
})