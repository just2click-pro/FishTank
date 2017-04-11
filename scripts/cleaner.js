function Cleaner($container, imageUrl) {
	this.image = undefined;
	this.position = {
		'x': 0,
		'y': 0
	};
	this.direction = (utils.random(1, 2) === 1 ? 'right' : 'left');
	this.energy = utils.random(500, 1000);	// Start with a random amount of food
	this.moveInterval = undefined;

	this.move = function () {
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
				if ((this.position.x + 10) > (bounds.right - bounds.left)) {
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
		var viewport = utils.viewport();

		this.position.x = utils.random(0, bounds.right - bounds.left);
		this.position.y = bounds.bottom - bounds.top + viewport.vh * 0.058;

		this.renderCleaner();
		this.moveCleanerRender();

		this.moveInterval = setInterval(function () {
			that.move();
		}, utils.random(100, 900));
	};

	this.clean = function () {
		if (this.energy <= 10) {
			this.done();
		}
		// Clean every random value of seconds
		// You can only clean while you have energy
		$container.tank.dispatchEvent($container.cleanEvent);
	};

	this.done = function () {
		// If food level is below 10 - die
		$container.tank.removeChild(this.image);
		clearInterval(this.moveInterval);
			// die
	};

	this.renderCleaner = function () {
		this.image = document.createElement('img');
		this.image.setAttribute('src', imageUrl);
		this.image.setAttribute('class', 'item');
		$container.tank.appendChild(this.image);
	};

	this.moveCleanerRender = function () {
		if (this.direction === 'right') {
			this.image.setAttribute('class', 'item right-item');
		} else {
			this.image.setAttribute('class', 'item');
		}
		this.image.setAttribute('style', 'top:' + this.position.y + 'px; ' +
			'left:' + this.position.x + 'px; ' +
			'height: 4vh;');
	};
}
