var wa = require('@open-wa/wa-automate');

var _waConfig = {
	sessionId: '‪16154996391‬',
	authTimeout: 0
};

var _whatsappStart = (whatsapp) => {
	console.log('Successfully start WhatsApp Web');

	// ==============
	// WHATSAPP EVENT
	// ==============

	// returns 'CONNECTED' or 'TIMEOUT' or 'CONFLICT' (if user opens whatsapp web somewhere else)
	whatsapp.onStateChanged((state) => {
		console.log('onStateChanged', state);

		switch (state) {
			case 'CONFLICT':
			case 'UNLAUNCHED':
				whatsapp.forceRefocus();
				break;
			default:
				break;
		}
	});

	whatsapp.onAnyMessage((message) => {
		console.log(`=== onAnyMessage - ${message.type} ===`);
		console.log(JSON.stringify(message));
		console.log('=== END ===');
	});
};

wa.create(_waConfig)
.then(async client => await _whatsappStart(client))
.catch(e => {
	console.log('CREATE ERROR', e.message);
});