function Tank () {
	var that = this;
	this.fishTank = document.querySelector('.inner-tank');
	this.water = document.querySelector('.tank');
	this.allFish = [];

	this.baseColor = '#09f';
	this.gradientTopColor = '#0099ff';
	this.gradiantBottomColor = '#45d1ff';

	this.bottom = 0;
	this.left = 0;
	this.right = 0;
	this.top = 0;

	this.tankPoop = 0;

	this.poopEvent = new Event('poop');
	this.cleanEvent = new Event('clean');
	this.deadFishEvent = new Event('dead-fish');

	this.getWaterBackground = function () {
		return (
			'background:' + this.baseColor + ';' +
			'background-image: -moz-linear-gradient(bottom,' + this.gradientTopColor + ',' + this.gradiantBottomColor + ');' +
			'background-image: -webkit-linear-gradient(bottom,' + this.gradientTopColor + ',' + this.gradiantBottomColor + ');' +
			'background-image: linear-gradient(to top,'  + this.gradientTopColor + ',' + this.gradiantBottomColor + ');');
	};

	this.onResize = function () {
		var rect = this.fishTank.getBoundingClientRect();

		this.bottom = rect.bottom;
		this.left = rect.left;
		this.right = rect.right;
		this.top = rect.top;
	};

	this.getBounds = function () {
		return {
			'bottom': this.bottom + 52,
			'left': this.left + 2,
			'right': this.right - 2,
			'top': this.top - 2,
		};
	};

	this.onFishPoop = function () {
		that.tankPoop++;

		if ((that.tankPoop % 100) === 0) {
			that.baseColor = lightenDarkenColor(that.baseColor, -5);
			that.gradientTopColor = lightenDarkenColor(that.gradientTopColor, -5);
			that.gradiantBottomColor = lightenDarkenColor(that.gradiantBottomColor, -5);

			that.water.setAttribute('style', that.getWaterBackground());
		}
	};

	this.onDeadFish = function (params) {
		var index = 0;

		try {
			that.allFish.forEach(function (isThisADeadFish) {
				if (isThisADeadFish.id === params.fish.id) {
					that.allFish.splice(index, 1);
					throw BreakException;
				}
			});
		} catch (e) {
			if (e !== BreakException) throw e;
		}
	};

	this.onClean = function () {
		that.tankPoop -= 10;

		if ((that.tankPoop % 100) === 0) {
			that.baseColor = lightenDarkenColor(that.baseColor, 5);
			that.gradientTopColor = lightenDarkenColor(that.gradientTopColor, 5);
			that.gradiantBottomColor = lightenDarkenColor(that.gradiantBottomColor, 5);

			that.water.setAttribute('style', that.getWaterBackground());
		}
	};

	this.selectFishImage = function () {
		var imageIndex = randomValue(1, 3);

		switch (imageIndex) {
			case 1:
				return '/resources/images/blue-fish.png';
			case 2:
				return '/resources/images/orange-fish.png';
			case 3:
				return '/resources/images/colorfull-fish.png';
		}
	};

	this.selectCleanerImage = function () {
		var imageIndex = randomValue(1, 2);

		switch (imageIndex) {
			case 1:
				return '/resources/images/broom.png';
			case 2:
				return '/resources/images/vacuum-cleaner.png';
		}
	};

	this.addFish = function () {
		var fish = new Fish(this, this.selectFishImage());
		fish.id = guid();
		fish.hatch();
		this.allFish.push(fish);
		this.fishTank.addEventListener('poop', this.onFishPoop);
		this.fishTank.addEventListener('dead-fish', this.onDeadFish);
	};

	this.addCleaner = function () {
		var cleaner = new Cleaner(this, this.selectCleanerImage());
		cleaner.spawn();
		this.fishTank.addEventListener('clean', this.onClean);
	};

	this.feed = function () {
		for (var fish of this.allFish) {
			fish.eat(randomValue(10, 100));
		}
	};

	this.water.setAttribute('style', this.getWaterBackground());
}
