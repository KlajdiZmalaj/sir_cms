var chatZenLoaded = false;
var isMobile = cg_CODICE_PRODOTTO == 1 || cg_CODICE_PRODOTTO == 6 || cg_CODICE_PRODOTTO == 8;

function loadChatButton() {
	/// Hide on load
	if (typeof $zopim != "undefined") {
		$zopim.livechat.hideAll();
	}
}

function openChat() {
	$zopim.livechat.window.show();
}

jQuery(document).ready(function () {
	(function () {

		// Code of Luigi (exalogic)
		if (typeof messageListener !== 'undefined') {
			window.addEventListener('message', messageListener);
		}

		// Code OIA
		window.zESettings = {
			webWidget: {
				color: {
					theme: '#2E8B4B',
					launcherText: "#FFFFFF"
				},
				zIndex: 999999999999
			}
		};

		zE(function () {
			$zopim(function () {
				$zopim.livechat.window.setPosition('bl');
				$zopim.livechat.setLanguage('it');
				$zopim.livechat.addTags("betaland_chat");
				$zopim.livechat.theme.reload();

				if (isMobile) {
					$zopim.livechat.hideAll();
					$zopim.livechat.setOnChatEnd(function () {
						$zopim.livechat.hideAll();
					});
					$zopim.livechat.window.onHide(function () {
						$zopim.livechat.hideAll();
					});
					$zopim.livechat.setOnStatus(function (status) {
						if (status.trim() === 'online' && !chatZenLoaded) {
							loadChatButton();
							chatZenLoaded = true;
						}
					});
				}
			});
		})
	})();
});