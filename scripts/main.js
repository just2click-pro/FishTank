var aquaFun = {};

var fishTank = (function () {

	this.tank = new Tank();
	this.ui = new UI(tank);

	messaging.postMessage(messaging.messageKeys.welcome);

	return {
		tank: this.tank,
		tankUI: this.ui
	};

})();
