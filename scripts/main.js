aquaFun.fishTank = (function () {

	this.tank = new aquaFun.Tank();
	this.ui = new aquaFun.UI(tank);

	aquaFun.messaging.postMessage(aquaFun.messaging.messageKeys.welcome);

})();
