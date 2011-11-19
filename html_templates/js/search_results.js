(function($) {
	$(function() {
		var top_limit = $('#top').height();
		var $related = $('.related');
		$(window).scroll(function() {
		    var top = $(this).scrollTop();
			if (top <= 150) {
				top = 0;
			} else {
				top = top - top_limit;
			}
			$related.css('top', top + "px");
		});
	});
})(jQuery);