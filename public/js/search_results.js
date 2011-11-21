(function($) {
	var top_limit;
	var $related;
	function _moveMap(top) {
		if (top <= top_limit) {
			top = 0;
		} else {
			top = top - top_limit;
		}
	    $related.css('top', top + "px")
	}
	function enableScrollingMap() {
		var relatedHeight = $related.offset().top + $related.height();
		if ($(window).height() < relatedHeight) return;
		$(window).scroll(function() {
			_moveMap($(this).scrollTop());
		});
	}      
	function scrollMapToCurrent() {
		var $listings = $('.listing');
		$listings.hover(function() {
			_moveMap($(this).offset().top-30);
		})
	}
	$(function() {
		top_limit = $('#promo').offset().top + $('#promo').height() + 40;
		$related = $('.related');
		if ($related.length == 0) return;
		enableScrollingMap();
		scrollMapToCurrent();
	});
})(jQuery);