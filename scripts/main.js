aquaFun.fishTank = (function () {

	function init () {
		this.tank = new aquaFun.Tank();
		this.ui = new aquaFun.UI(this.tank);

		aquaFun.messaging.postMessage(aquaFun.messaging.messageKeys.welcome);
	}

	return {
		init: init
	};
})();
