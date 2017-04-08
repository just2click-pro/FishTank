 var UI = function (tank) {
	var btnAddFish = document.querySelector('#add-fish');
	var btnAddCleaner = document.querySelector('#add-cleaner');
	var btnGiveFood = document.querySelector('#give-food');

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

};
