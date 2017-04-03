function Cleaner($container, imageUrl) {
	this.image = undefined;
	this.position = {
		'x': 0,
		'y': 0
	};
	this.direction = (randomValue(1, 2) === 1 ? 'right' : 'left');
	this.energy = randomValue(500, 1000);	// Start with a random amount of food
	this.moveInterval = undefined;

	this.move = function () {
		var bounds = $container.getBounds();
		this.vw4 = document.documentElement.clientWidth * 0.045;

		switch (this.direction) {
			case 'left':
				if ((this.position.x - 10) < 20) {
					this.direction = 'right';
				} else {
					this.position.x -= 10;
				}
				break;
			case 'right':
				if ((this.position.x + 10) > (bounds.right - bounds.left - this.vw4)) {
					this.direction = 'left';
				} else {
					this.position.x += 10;
				}
				break;
		}

		this.energy--;
		if (this.energy % 10) { this.clean(); }
		this.moveCleanerRender();
	};

	this.spawn = function () {
		var that = this;
		var bounds = $container.getBounds();

		var vw4 = document.documentElement.clientWidth * 0.04;
		var vh2 = document.documentElement.clientHeight * 0.2;

		this.position.x = randomValue(0, bounds.right - bounds.left - (2 * vw4));
		this.position.y = bounds.bottom - (bounds.top + vh2);

		this.renderCleaner();
		this.moveCleanerRender();

		this.moveInterval = setInterval(function () {
			that.move();
		}, randomValue(100, 900));
	};

	this.clean = function () {
		if (this.energy <= 10) {
			this.done();
		}
		// Clean every random value of seconds
		// You can only clean while you have energy
		$container.fishTank.dispatchEvent($container.cleanEvent);
	};

	this.done = function () {
		// If food level is below 10 - die
		$container.fishTank.removeChild(this.image);
		clearInterval(this.moveInterval);
			// die
	};

	this.renderCleaner = function () {
		this.image = document.createElement('img');
		this.image.setAttribute('src', imageUrl);
		this.image.setAttribute('class', 'item');
		$container.fishTank.appendChild(this.image);
	};

	this.moveCleanerRender = function () {
		if (this.direction === 'right') {
			this.image.setAttribute('class', 'item right-item');
		} else {
			this.image.setAttribute('class', 'item');
		}
		this.image.setAttribute('style', 'top:' + this.position.y + 'px; left:' + this.position.x + 'px');
	};
}
