aquaFun.messaging = (function () {
	var lastMessageKey = -1;
	var messageKeys = {
		'welcome': 0,
		'hungry': 1,
		'dirty': 2,
		'tooClean': 3,
		'lonely': 4,
		'tooDirty': 5,
		'end': 6
	};

	var messages = [
		{ message: 'Welcome to "Aqua Fun" fish tank, add a fish to start', title: "Welcome!" },
		{ message: 'Hey you, feed the fish, they are starving', title: "Warning" },
		{ message: 'Too many fish around, water are murky, add clenaers', title: "Warning" },
		{ message: 'Too many cleaners, water are getting too clear, add more fish', title: "Warning" },
		{ message: 'The tank is getting empty, add more fish', title: "Warning" },
		{ message: 'The tank is too dirty, Game Over', title: "Game Over" },
		{ message: 'All the fish are DEAD :-(', title: "Game Over" }
	];

	var $lightbox = $('.lightbox');
	var $modalDialog = $(".modal-dialog");
	var $title = $(".modal-dialog .title");
	var $content = $(".modal-dialog .message");
	var $close = $(".modal-dialog .close-button");
	var $ok = $("#modal-ok");

	$close.on('click', okClose);
	$ok.on('click', okClose);

	//var $content = document.querySelector('.rolling-messages .content');

	function postMessage (messageKey) {
		if (lastMessageKey === messageKey) { return; }
		lastMessageKey = messageKey;

		$title.text(messages[messageKey].title);
		$content.text(messages[messageKey].message);

		switch (messageKey) {
			case 0:
				$modalDialog.removeClass().addClass('modal-dialog normal');
				$ok.removeClass().addClass('btn btn-primary');
				break;

			case 1:
			case 2:
			case 3:
			case 4:
				$modalDialog.removeClass().addClass('modal-dialog warning');
				$ok.removeClass().addClass('btn btn-warning');
				break;
			case 5:
			case 6:
				$modalDialog.removeClass().addClass('modal-dialog danger');
				$ok.removeClass().addClass('btn btn-danger');
				break;
		}

		$lightbox.removeClass('hide').addClass('show');

		// if ($content.children.length > 3) {
		// 	$content.removeChild($content.lastChild);
		// }

		// var message = document.createElement('div');
		// message.setAttribute('class', 'message');
		// message.textContent = messages[messageKey];

		// $content.insertBefore(message, $content.firstChild);

		// var fadeIn = setTimeout(function () {
		// 	message.setAttribute('class', 'message fade');
		// 	clearTimeout(fadeIn);
		// }, 100);
	}

	function okClose () {
		$title.text('');
		$content.text('');
		$lightbox.removeClass('show').addClass('hide');
	}

	return {
		messageKeys: messageKeys,
		postMessage: postMessage
	};

})();
