require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// let bodyParser = require('body-parser');

// Front End
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// support json encoded bodies
// app.use(bodyParser.json());
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// support encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));

// Set CORS headers
app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', ['localhost']);
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// Configure Express application:
app.use(require('morgan')('tiny'));

require('./configuration').setEnvironment();

// Authentication and Authorization Middleware:
require('./auth')(app);

// Setup API router:
require('./api')(app);

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Express started on port ${process.env.PORT || 3001} with Graphql endpoint ${
      process.env.TRAY_ENDPOINT
    }`
  );
});
