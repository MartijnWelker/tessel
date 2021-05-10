var tessel = require('tessel');
var relaylib = require('relay-mono');
var ws = require('ws');

var relay = relaylib.use(tessel.port['A']);
//
// // Wait for the module to connect
relay.on('ready', function relayReady () {
	console.log('Ready! Toggling relays...');
});
// // When a relay channel is set, it emits the 'latch' event
relay.on('latch', function(channel, value) {
	console.log('latch on relay channel ' + channel + ' switched to', value);
});


// fixme: correct url
const connection = new ws('ws://tesselserver.rentman.net')

connection.on('open', () => {
	console.log('Establised connection to the socket server');
});

connection.on('error', e => {
	console.log('Error in connection', e);
});

var blinkMap = {};

connection.on('message', e => {
	console.log('got message', e);
	const dingen = JSON.parse(e);

	if (dingen.action === undefined) {
		return;
	}

	dingen.channel = dingen.channel || 1;

	console.log('action is', dingen.action);
	console.log('channel is', dingen.channel);

	if (blinkMap[dingen.channel]) {
		console.log('clearing interval', blinkMap[dingen.channel]);
		clearInterval(blinkMap[dingen.channel]);
	}

	switch (dingen.action) {
		case 'on':
			console.log('Going on!');
			relay.turnOn(dingen.channel || 1, function toggleOneResult(err) {
				if (err) console.log("Err toggling 1", err);
			});
			break;
		case 'off':
			console.log('Going off!');
			relay.turnOff(dingen.channel || 1, function toggleOneResult(err) {
				if (err) console.log("Err toggling 1", err);
			});
			break;
		case 'blink':
			console.log('Disco time!');
			blinkMap[dingen.channel] = setInterval(
				() => {
					relay.toggle(dingen.channel || 1, function toggleOneResult(err) {
						if (err) console.log("Err toggling 1", err);
					});
				},
				dingen.speed || 1000,
			);
			break;
	}
});
