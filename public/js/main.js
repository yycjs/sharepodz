$(function() {
	$('.button, button, input[type="submit"]').button();
	
	$('#tags').tagit({
        select : true, 
        triggerKeys: ['enter', 'comma', 'tab', 'space'], 
        tagSource: function( request, response ) {
			$.ajax({
				url: '/tag/autocomplete.json',
				dataType: "json",
				data: {
					limit: 10,
					contains: request.term
				},
				success: function( data ) {
					response( $.map( data, function( item ) {
						return {
							label: item.name,
							value: item.name
						}
					}));
				}
			});
		},
		minLength: 1
    });
});
