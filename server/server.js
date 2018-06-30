const express = require('express'),
      app = express(),
      path = require('path'),
      config = require('./config.json');


if (process.env.ENV === 'PROD') {
  console.log('Running in production mode.');
  app.use(express.static(path.join(__dirname, config.prod.path)))
}
else {
  console.log('Running in development mode - run npm start from the client folder.');
}

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
})