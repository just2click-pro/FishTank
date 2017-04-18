aquaFun.Cleaner = function ($container, imageUrl) {

	// Cleaner Properties
	this.id = aquaFun.utils.guid();
	this.image = undefined;

	this.position = {
		'x': 0,
		'y': 0
	};
	this.direction = (aquaFun.utils.random(1, 2) === 1 ? 'right' : 'left');
	this.energy = aquaFun.utils.random(500, 1000);	// Start with a random amount of energy

	this.moveInterval = undefined;

	// Clenaer actions
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
		if (this.energy % 10 === 0) { this.clean(); }
		this.moveCleanerRender();
	};

	this.spawn = function () {
		var that = this;
		var bounds = $container.getBounds();
		var viewport = aquaFun.utils.viewport();

		this.position.x = aquaFun.utils.random(0, bounds.right - bounds.left);
		this.position.y = bounds.bottom - bounds.top + viewport.vh * 0.058;

		this.renderCleaner();
		this.image = $('#' + this.id);
		this.moveCleanerRender();

		this.moveInterval = setInterval(function () {
			that.move();
		}, aquaFun.utils.random(10, 900));
	};

	this.clean = function () {
		if (this.energy <= 10) {
			this.done();
		}
		// Clean every random value of seconds
		// You can only clean while you have energy
		$($container.tank).trigger({
			type: 'clean'
		});
	};

	this.done = function (silent) {
		if (!silent) {
			var self = this;

			$($container.tank).trigger({
				type: 'claner-done',
				id: self.id
			});
		}
		this.image.remove();
		clearInterval(this.moveInterval);
	};

	// Renderers
	this.renderCleaner = function () {
		$($container.tank).append('<img id="' + this.id + '" src="' + imageUrl + '" class="item" />');
	};

	this.moveCleanerRender = function () {
		if (this.direction === 'right') {
			$(this.image).addClass('right-item');
		} else {
			$(this.image).removeClass('right-item');
		}
		$(this.image).css({
			'height': '4vh',
			'left':this.position.x + 'px',
			'top': this.position.y + 'px'
		});
	};
};
