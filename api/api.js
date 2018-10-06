const express = require('express'),
	api = express(),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	config = require('./config'),
	cors = require('cors');

api.use(cors());
api.use(express.static('public'));
api.use(bodyParser.urlencoded({
	extended: false
  }));
api.use(bodyParser.json());

fs.readdirSync(config.endpointsDir).forEach(file => {
	api.use(require(`${config.endpointsDir}${file}`))
})

api.listen(config.port, () => {
	console.log(`API listening on port ${config.port}`);
})