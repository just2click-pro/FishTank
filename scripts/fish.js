aquaFun.Fish = function ($container, imageUrl) {

	// Fish properties
	this.id = aquaFun.utils.guid();
	this.fish = undefined;
	this.image = undefined;
	this.percentage = undefined;

	this.energyColors = {
		green: '#99ff33',
		red: '#ff6666'
	};

	this.position = {
		'x': 0,
		'y': 0
	};

	this.direction = (aquaFun.utils.random(1, 2) === 1 ? 'right' : 'left');
	this.food = aquaFun.utils.random(50, 400);	// Start with a random amount of food
	this.size = aquaFun.utils.random(4, 10);
	this.growth = aquaFun.utils.random(3, 5) / 100;
	this.dying = false;

	this.swimInterval = undefined;

	this.energyPercentage = function () {
		return aquaFun.utils.percentage({
			value: this.food,
			maxValue: 500,
			lowerLimit: 4,
			topLimit: 96
		});
	};

	// Fish actions
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
				if ((this.position.x + 10) > (bounds.right - bounds.left)) {
					this.direction = 'left';
				} else {
					this.position.x += 10;
				}
				break;
		}

		this.food--;
		if (this.food % 10) { this.poop(); }
		if (this.dying) {
			this.deadFishRender(this.fish);
		} else {
			this.swimFishRender();
		}
	};

	this.hatch = function () {
		var that = this;
		var bounds = $container.getBounds();

		this.position.x = aquaFun.utils.random(0, bounds.right - bounds.left);
		this.position.y = aquaFun.utils.random(40, bounds.bottom - bounds.top);

		this.renderFish();
		this.fish = $('#' + this.id);
		this.image = $('#fishImage_' + this.id);
		this.percentage = $('#fishPercentage_' + this.id);
		this.swimFishRender('fish');

		this.swimInterval = setInterval(function () {
			that.swim();
		}, 500);
	};

	this.eat = function (food) {
		if ((this.food + food) > 500) {
			this.food = 500;
		} else {
			this.food += food;
		}

		this.energyRender();

		if (this.size < 8) {
			this.size += this.growth * 10;
		}
	};

	this.poop = function () {
		if (this.size > 3) {
			this.size -= this.growth;
		}

		this.energyRender();

		if (this.food <= 10) {
			this.die();
		}
		// Poop every random value of seconds
		// You can only poop if you have food
		$($container.tank).trigger({
			type: 'poop'
		});
	};

	this.die = function (silent) {
		if (!silent) {
			var self = this;
			// If food level is below 10 - die
			// die
			this.dying = true;

			$($container.tank).trigger({
				type: 'dead-fish',
				id: self.id
			});
		}

		this.fish.remove();
		clearInterval(this.swimInterval);
	};

	// Rendereds
	this.renderFish = function () {
		$($container.tank).append('<div class="fish" id="' + this.id + '">' +
			'<img id="fishImage_' + this.id + '" src="' + imageUrl + '" />' +
			'<div class="energy">' +
				'<div id="fishPercentage_' + this.id +  '" class="percentage" style="background:' +
					(this.food > 200 ? this.greenColor : this.redColor) + '; ' +
					'width: ' + this.energyPercentage() + '%;">' +
				'</div>' +
			'</div>' +
		'</div>');
	};

	this.deadFishRender = function (fish) {
		this.swimFishRender('upside-down');

		var flipDeadFishTimer = setTimeout(function () {
			fish.remove();
			clearTimeout(flipDeadFishTimer);
		}, 1000);
	};

	this.swimFishRender = function (additionalClass) {
		if (this.direction === 'right') {
			$(this.image).addClass('right-item ' + additionalClass);
		} else {
			$(this.image).removeClass('right-item');
			if (additionalClass) {
				$(this.image).addClass(additionalClass);
			}
		}
		$(this.image).css({'height': this.size + 'vh' });
		$(this.fish).css({
			'position': 'absolute',
			'top': this.position.y + 'px',
			'left': this.position.x + 'px'
		});
	};

	this.energyRender = function () {
		$(this.percentage).css({
			'background': (this.food > 200 ? this.energyColors.green : this.energyColors.red),
			'width': this.energyPercentage() + '%'
		});
	};
};
