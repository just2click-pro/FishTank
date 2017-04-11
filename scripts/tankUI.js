 aquaFun.UI = function (tank) {
	var btnAddFish = document.querySelector('#add-fish');
	var btnAddCleaner = document.querySelector('#add-cleaner');
	var btnGiveFood = document.querySelector('#give-food');
	var lastButtonFlickered;

	btnAddFish.onclick = function (event) {
		event.preventDefault();
		tank.addFish();
	};

	btnAddCleaner.onclick = function (event) {
		event.preventDefault();
		tank.addCleaner();
	};

	btnGiveFood.onclick = function (event) {
		tank.feed();
	};

	var buttonKeys = {
		add: btnAddFish,
		cleaner: btnAddCleaner,
		food: btnGiveFood
	};

	function flickerButton (button) {
		if (button !== lastButtonFlickered) {
			lastButtonFlickered = button;
			var classes = button.getAttribute('class');
			var flick = classes.replace('btn-success', 'btn-danger');

			button.setAttribute('class', flick);
			button.style.backgroundColor = '#d43f3a';

			var flickerTimeout = setTimeout(function () {
				button.setAttribute('class', classes);
				button.style.backgroundColor = '#5cb85c';
				clearTimeout(flickerTimeout);
			}, 500);
		}
	}

	return {
		buttonKeys: buttonKeys,
		flickerButton: flickerButton
	};

};
