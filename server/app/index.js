const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

var app = express();
app.use(bodyParser.json());
app.use(allowCrossDomain);

var server = http.createServer(app);

console.log('starting server');

const wss = new WebSocket.Server({ server });

app.get('/', function (req, res) {
	res.writeHead('200');
	res.end('Alive and running\n');
});

function allowCrossDomain(req, res, next) {
	res.header('Access-Control-Allow-Origin', '127.0.0.1');
	res.header('Access-Control-Allow-Origin', 'localhost');
	res.header('Access-Control-Allow-Origin', '*.rentman.nl');
	res.header('Access-Control-Allow-Origin', '*.rentman.de');
	res.header('Access-Control-Allow-Origin', '*.rentman.eu');
	res.header('Access-Control-Allow-Origin', '*.onlinerentalsoftware.eu');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
}


wss.on('connection', ws => {
	console.log('connection received');

	ws.on('message', message => {
		console.log(`Received message => ${message}`)
	})

	ws.send('ho!')
})

server.listen(80);

console.log('server started on port 80');
