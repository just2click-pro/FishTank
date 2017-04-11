var messaging = (function () {
	var lastMessageKey = -1;
	var messageKeys = {
		'welcome': 0,
		'hungry': 1,
		'dirty': 2,
		'lonely': 3,
		'end': 4
	};

	var messages = [
		'Welcome to "Aqua Fun" fish tank, add a fish to start',
		'Hey you, feed the fish, they are starving',
		'Too many fish around, water are murky, add clenaers',
		'The tank is getting empty, add more fish',
		'All the fish are DEAD :-('
	];

	var $content = document.querySelector('.rolling-messages .content');

	function postMessage(messageKey) {
		if (lastMessageKey === messageKey) { return; }
		lastMessageKey = messageKey;
		if ($content.children.length > 3) {
			$content.removeChild($content.lastChild);
		}

		var message = document.createElement('div');
		message.setAttribute('class', 'message');
		message.textContent = messages[messageKey];

		$content.insertBefore(message, $content.firstChild);

		var fadeIn = setTimeout(function () {
			message.setAttribute('class', 'message fade');
			clearTimeout(fadeIn);
		}, 100);
	}

	return {
		messageKeys: messageKeys,
		postMessage: postMessage
	};

})();
