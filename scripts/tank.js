var Tank = function () {
	var self = this;
	var BreakException = {};

	this.fishFood = document.querySelector('#fish-food');
	this.tank = document.querySelector('.tank');
	this.water = document.querySelector('.water');
	this.allFish = [];

	this.tankPoop = 0;

	this.poopEvent = new Event('poop');
	this.cleanEvent = new Event('clean');
	this.deadFishEvent = new Event('dead-fish');

	this.getBounds = function () {
		return utils.props(document.querySelector('.water'));
	};

	this.handleFishPoop = function () {
		self.tankPoop++;

		if ((self.tankPoop % 100) === 0) {
			self.handleWaterChanges(-0.05);
		}

		self.countHungryFish();
	};

	this.handleCleanWater = function () {
		self.tankPoop -= 10;

		if ((self.tankPoop % 100) === 0) {
			self.handleWaterChanges(0.05);
		}
	};

	this.handleWaterChanges = function (value) {
		var waterOpacity = this.water.style.opacity;
		if (typeof waterOpacity === 'string') {
			waterOpacity = parseFloat(waterOpacity);
		}

		if ((waterOpacity > 0.01) && (waterOpacity < 1.00)) {
			this.water.setAttribute('style', 'opacity: ' + (waterOpacity + value));
		}
	};

	this.handleDeadFish = function (params) {
		try {
			self.allFish.forEach(function (isThisADeadFish, index) {
				if (isThisADeadFish.id === params.fish.id) {
					self.allFish.splice(index, 1);
					throw BreakException;
				}
			});
		} catch (e) {
			if (e !== BreakException) throw e;
		}

		if (self.countLiveFish() === 0) {
			messaging.postMessage(messaging.messageKeys.end);
			throw new Error("All the fish are dead!!");
		} else if (self.countLiveFish() < 5) {
			messaging.postMessage(messaging.messageKeys.lonely);
			fishTank.tankUI.flickerButton(fishTank.tankUI.buttonKeys.add);
		}
	};

	this.selectFishImage = function () {
		var imageIndex = utils.random(1, 3);

		switch (imageIndex) {
			case 1:
				return 'resources/images/blue-fish.png';
			case 2:
				return 'resources/images/orange-fish.png';
			case 3:
				return 'resources/images/colorfull-fish.png';
		}
	};

	this.selectCleanerImage = function () {
		var imageIndex = utils.random(1, 2);

		switch (imageIndex) {
			case 1:
				return 'resources/images/broom.png';
			case 2:
				return 'resources/images/vacuum-cleaner.png';
		}
	};

	this.countHungryFish = function () {
		var hungryFish = 0;

		for (var fish of this.allFish) {
			hungryFish += (fish.food < 30 ? 1: 0);
		}

		if ((hungryFish / this.allFish.length) > 0.5) {
			messaging.postMessage(messaging.messageKeys.hungry);
			fishTank.tankUI.flickerButton(fishTank.tankUI.buttonKeys.food);
		}
	};

	this.countLiveFish = function () {
		return this.allFish.length;
	};

	this.fishToCleanerRatio = function () {
		var cleanersCount = document.querySelectorAll('.item');

		return (cleanersCount.length / this.countLiveFish());
	};

	this.addFish = function () {
		var fish = new Fish(this, this.selectFishImage());
		fish.id = utils.guid;
		fish.hatch();
		this.allFish.push(fish);
		this.tank.addEventListener('poop', this.handleFishPoop);
		this.tank.addEventListener('dead-fish', this.handleDeadFish);
		if ((this.fishToCleanerRatio() < 0.3) && (this.countLiveFish() > 3)) {
			messaging.postMessage(messaging.messageKeys.dirty);
			fishTank.tankUI.flickerButton(fishTank.tankUI.buttonKeys.cleaner);
		}
	};

	this.addCleaner = function () {
		var cleaner = new Cleaner(this, this.selectCleanerImage());
		cleaner.spawn();
		this.tank.addEventListener('clean', this.handleCleanWater);
	};

	this.feed = function () {
		var self = this;
		this.fishFood.setAttribute('class', 'show');
		for (var fish of this.allFish) {
			fish.eat(utils.random(10, 50));
		}
		var endFeeding = setTimeout(function() {
			self.fishFood.setAttribute('class', 'hide');
			clearTimeout(endFeeding);
		}, 2000);
	};
};
