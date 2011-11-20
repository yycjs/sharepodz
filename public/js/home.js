(function($) {
	$(function() {
		var timeOut = 5000;
		var $promoList = $('#promo>ul');
		var $promo = $('#promo>ul li:first-child');
		function next() {
			var newWidth = $promoList.width() + 526;
			var newMargin = $promoList.css('margin-left').replace(/px/, '') - 526;
			console.debug(newMargin);
			console.debug(newWidth);
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
			});
		}
		setTimeout(next, timeOut);
	});
})(jQuery);