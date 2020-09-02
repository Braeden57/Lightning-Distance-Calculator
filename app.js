var express = require('express')
var path = require('path');
var http = require('http').createServer(express);

var newBaseURL = process.env.NEW_BASE_URL || 'http://localhost:3000';
var redirectStatus = parseInt(process.env.REDIRECT_STATUS || 302);
var oldBaseURL = process.env.OLD_BASE_URL

const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

const server = app.listen(port, function () {
	console.log('Server started.', server.address());
});

require('./app/routes')(app, server);