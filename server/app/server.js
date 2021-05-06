module.exports = (function (ws, app) {
	app.post('/post', doPost);

	function doPost (req, res, next) {
		var message = req.body;

		ws.clients.forEach(function each(client) {
			client.send(msg);
		});

		res.writeHead(200, {"Content-Type": "application/json"});
		res.end();
	}

	console.log('websocket listening to connections');

	ws.on('connection', ws => {
		console.log('connection received');

		ws.on('message', message => {
			console.log(`Received message => ${message}`)
		})

		ws.send('ho!')
	})

});
