var Tank = function () {
	var self = this;
	var BreakException = {};

	this.fishTank = document.querySelector('.tank');
	this.water = document.querySelector('.water');
	this.allFish = [];

	this.tankPoop = 0;

	this.poopEvent = new Event('poop');
	this.cleanEvent = new Event('clean');
	this.deadFishEvent = new Event('dead-fish');

	this.getBounds = function () {
		var viewport = utils.viewport();
		var waterProps = utils.props(this.water);

		return {
			'top': waterProps.top - viewport.vh * 0.05,
			'right': waterProps.width - (viewport.vw * 0.03),
			'bottom': waterProps.top + waterProps.height - (viewport.vh * 0.09),
			'left': waterProps.left + viewport.vw * 0.05
		};
	};

	this.handleFishPoop = function () {
		self.tankPoop++;

		if ((self.tankPoop % 100) === 0) {
			self.handleWaterChanges(-0.01);
		}
	};

	this.handleCleanWater = function () {
		self.tankPoop -= 10;

		if ((self.tankPoop % 100) === 0) {
			self.handleWaterChanges(0.01);
		}
	};

	this.handleWaterChanges = function (value) {
		var waterOpacity = this.water.getAttribute('style');
		waterOpacity = parseFloat(waterOpacity.split(':')[1], 10);

		if ((waterOpacity > 0.01) && (waterOpacity < 1.00)) {
			this.water.setAttribute('style', waterOpacity + value);
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

	this.addFish = function () {
		var fish = new Fish(this, this.selectFishImage());
		fish.id = utils.guid;
		fish.hatch();
		this.allFish.push(fish);
		this.fishTank.addEventListener('poop', this.handleFishPoop);
		this.fishTank.addEventListener('dead-fish', this.handleDeadFish);
	};

	this.addCleaner = function () {
		var cleaner = new Cleaner(this, this.selectCleanerImage());
		cleaner.spawn();
		this.fishTank.addEventListener('clean', this.handleClean);
	};

	this.feed = function () {
		for (var fish of this.allFish) {
			fish.eat(utils.random(10, 100));
		}
	};
};
