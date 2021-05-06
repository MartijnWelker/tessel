const WebSocket = require('ws')

console.log('starting server');

const wss = new WebSocket.Server({ port: 80 })

console.log('server started on port 80');

wss.on('connection', ws => {
	console.log('connection received');

	ws.on('message', message => {
		console.log(`Received message => ${message}`)
	})

	ws.send('ho!')
})
