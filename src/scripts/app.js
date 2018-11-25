(function() {
	'use strict'

	// Variables
	const form         = document.querySelector('.form');
	const sayIt        = document.querySelector('.say-it');
	const whatToSay    = form.whatToSay;
	const selectVoices = form.voice;
	const selectVolume = form.volume;
	const selectRate   = form.rate;
	const selectPitch  = form.pitch;
	let voices;
	let message;

	// Object that contains all application
	const app = {};

	// Start the application
	app.init = () => {

		// Handle listeners
		app.handleListeners();

		// get voices
		window.speechSynthesis.onvoiceschanged = function() {
			app.getAllVoices();
		};
		app.getAllVoices();
	};

	// Listeners
	app.handleListeners = () => {
		// What to say
		whatToSay.addEventListener('click', () => whatToSay.select());

		// Say it
		sayIt.addEventListener('click', (e) => {
			e.preventDefault();
			app.setMessage();
		});

		// Select volume
		app.rangeChange(selectVolume);

		// Select rate
		app.rangeChange(selectRate);

		// Select pitch
		app.rangeChange(selectPitch);
	};

	// Inputs range changes
	app.rangeChange = (el) => {
		el.addEventListener('change', () => {
			el.nextElementSibling.textContent = el.value;
		});
	};

	// Get all voices
	app.getAllVoices = () => {
		voices  = speechSynthesis.getVoices();

		voices.forEach((voice, index) => {
			let voiceOption = document.createElement('option');

			voiceOption.value = index;
			voiceOption.innerHTML = voice.name;

			selectVoices.appendChild(voiceOption);
		});
	};

	// Set message
	app.setMessage = () => {
		let selectedVoice = voices[selectVoices.value];

		message          = new SpeechSynthesisUtterance();
		message.voice    = selectedVoice;
		message.voiceURI = 'native';
		message.volume   = selectVolume.value;
		message.rate     = selectRate.value;
		message.pitch    = selectPitch.value;
		message.text     = whatToSay.value;
		message.lang     = selectedVoice.lang;

		speechSynthesis.speak(message);
	};

	// Init
	app.init();

})();
