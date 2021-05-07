module.exports = (function (ws, app) {
	app.post('/post', doPost);

	function doPost (req, res, next) {
		var message = req.body;

		console.log('received message', JSON.stringify(message));

		ws.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				console.log('Sending message to client', client.id);
				client.send(JSON.stringify(message));
			}
		});

		res.writeHead(200, {"Content-Type": "application/json"});
		res.end();
	}

	console.log('websocket listening to connections');

	ws.on('connection', ws => {
		console.log('connection received');
	})

});
