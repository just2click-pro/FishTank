var Fish = function ($container, imageUrl) {
	this.image = undefined;
	this.position = {
		'x': 0,
		'y': 0
	};
	this.direction = (utils.random(1, 2) === 1 ? 'right' : 'left');
	this.food = utils.random(50, 100);	// Start with a random amount of food
	this.swimInterval = undefined;

	this.swim = function () {
		var bounds = $container.getBounds();

		switch (this.direction) {
			case 'left':
				if ((this.position.x - 10) < 20) {
					this.direction = 'right';
				} else {
					this.position.x -= 10;
				}
				break;
			case 'right':
				if ((this.position.x + 10) > bounds.right) {
					this.direction = 'left';
				} else {
					this.position.x += 10;
				}
				break;
		}

		this.food--;
		if (this.food % 10) { this.poop(); }
		this.swimFishRender('fish');
	};

	this.hatch = function () {
		var that = this;
		var bounds = $container.getBounds();

		this.position.x = utils.random(0, bounds.right - bounds.left);
		this.position.y = utils.random(0, bounds.bottom - bounds.top);

		this.renderFish();
		this.swimFishRender('fish');

		this.swimInterval = setInterval(function () {
			that.swim();
		}, utils.random(100, 900));
	};

	this.eat = function (food) {
		var that = this;
		this.food += food;
		this.swimFishRender('fish-scale');

		var eatTimer = setTimeout(function () {
			that.swimFishRender('fish');
			clearTimeout(eatTimer);
		}, 300);
	};

	this.poop = function () {
		if (this.food <= 10) {
			this.die();
		}
		// Poop every random value of seconds
		// You can only poop if you have food
		$container.fishTank.dispatchEvent($container.poopEvent);
	};

	this.die = function () {
		// If food level is below 10 - die
		$container.deadFishEvent.fish = this;
		$container.fishTank.dispatchEvent($container.deadFishEvent);
		$container.fishTank.removeChild(this.image);
		clearInterval(this.swimInterval);
			// die
	};

	this.renderFish = function () {
		this.image = document.createElement('img');
		this.image.setAttribute('src', imageUrl);
		this.image.setAttribute('class', 'fish');
		$container.fishTank.appendChild(this.image);
	};

	this.swimFishRender = function (fishClass) {
		if (this.direction === 'right') {
			this.image.setAttribute('class', fishClass + ' right-item');
		} else {
			this.image.setAttribute('class', fishClass);
		}
		this.image.setAttribute('style', 'top:' + this.position.y + 'px; left:' + this.position.x + 'px');
	};
};
