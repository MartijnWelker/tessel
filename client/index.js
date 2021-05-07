var tessel = require('tessel');
var relaylib = require('relay-mono');
var ws = require('ws');

// var relay = relaylib.use(tessel.port['A']);
//
// // Wait for the module to connect
// relay.on('ready', function relayReady () {
// 	console.log('Ready! Toggling relays...');
//
// 	setInterval(function toggle() {
// 		// Toggle relay channel 1
// 		relay.toggle(1, function toggleOneResult(err) {
// 			if (err) console.log("Err toggling 1", err);
// 		});
// 		// Toggle relay channel 2
// 		relay.toggle(2, function toggleTwoResult(err) {
// 			if (err) console.log("Err toggling 2", err);
// 		});
// 	}, 2000); // Every 2 seconds (2000ms)
// });
//
// // When a relay channel is set, it emits the 'latch' event
// relay.on('latch', function(channel, value) {
// 	console.log('latch on relay channel ' + channel + ' switched to', value);
// });


// fixme: correct url
const connection = new ws('ws://tesselserver.rentman.net')

connection.on('open', () => {
	console.log('Establised connection to the socket server');
});

connection.on('error', e => {
	console.log('Error in connection', e);
});

connection.on('message', e => {
	console.log('Received message', e.data);
});
