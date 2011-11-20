(function($) {
	$(function() {
		$('input[type=date]').each(function() {
			$newInput = $('<input type="text"/>')
				.attr('name', $(this).attr('name'))
				.attr('id', $(this).attr('name'))
				.datepicker(
					{ dateFormat: 'yy-mm-dd' }
				);
			$(this)
				.after($newInput)
				.remove();
		});
	});
})(jQuery);