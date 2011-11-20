(function($) {
	function startSildeShow() {
		var timeOut = 5000;
		var $promoList = $('#promo>ul');
		if ($promoList.length == 0) return;
		var $promo = $('#promo>ul li:first-child');
		function next() {
			var newWidth = $promoList.width() + 526;
			var newMargin = $promoList.css('margin-left').replace(/px/, '') - 526;
			$promoList
				.css('width', newWidth)
				.append($promo.clone().fadeIn(timeOut/10));
			$promoList.animate(
				{'margin-left' : newMargin}, 
				{
					'complete' : function() {
						$promo = $('#promo>ul li:first-child');
						setTimeout(next, timeOut);
					}
				}
			);
		}
		setTimeout(next, timeOut);
	}
	
	var loginProviders = ['twitter', 'facebook'];
	function _loginHover() {
		var $self = $(this);
		var $container = $self.parent().parent().parent();
		var $loginOptions = $container.find('#login-options');
		if ($loginOptions.length == 0) {
			$loginOptions = $('<div id="login-options"></div>');
			var $inner = $('<div class="bubble inverted rounded-b-right5 rounded-b-left5"></div>');
			$loginOptions.append(
				$inner.append('<div class="arrow2"></div>')
			);
			var $ul = $('<ul></ul>');
			$inner.append($ul);
			for (i=0;i<loginProviders.length;i++) {
				var provider = loginProviders[i];
				var $li = $('<li></li>');
				var $img = $('<img />')
					.attr('src', '/images/layout/auth-' + provider + '.png')
					.attr('alt', provider);
				var $a = $('<a>')
					.attr('href', '/auth/' + provider)
					.append($img);
				$ul.append($li.append($a));
			}
			$container.append($loginOptions);
			$loginOptions.mouseleave(function(){$loginOptions.fadeOut(500)});
		}
		$loginOptions.fadeIn(500);
		return false;
	}
	function login() {
		var $login = $('li.login a');
		$login
			.hover(_loginHover)
			.focus(_loginHover);
		
	}
	$(function() {
		startSildeShow();
		login();
	});
})(jQuery);
