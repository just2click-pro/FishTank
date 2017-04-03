function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// Origin https://css-tricks.com/snippets/javascript/lighten-darken-color/
function lightenDarkenColor(col, percent) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

  	var num = parseInt(col,16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		B = (num >> 8 & 0x00FF) + amt,
		G = (num & 0x0000FF) + amt;

		return (usePound?"#":"") + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}

var tank = new Tank();
var BreakException = {};

var btnAddFish = document.querySelector('#add-fish');
var btnAddCleaner = document.querySelector('#add-cleaner');
var btnGiveFood = document.querySelector('#give-food');

btnAddFish.onclick = function (event) {
	event.preventDefault();
	tank.onResize();
	tank.addFish();
};

btnAddCleaner.onclick = function (event) {
	event.preventDefault();
	tank.onResize();
	tank.addCleaner();
};

btnGiveFood.onclick = function (event) {
	event.preventDefault();
	tank.feed();
};
