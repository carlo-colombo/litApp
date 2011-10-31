;(function($){
	function dialog(dialog){
		var $dialog = $('<form>',{id:'dialog'})
				.append($('<ul>'));

		$.each(dialog,function(k,v){
			$('<li>').appendTo($dialog.find('ul'))
				.append($('<a>',{
					text: v.label || k,
					id: k,
					href: '#'+k
				}));

			$('<div>',{
				id: k,
				text: "prova " + k
			}).appendTo($dialog);
		});

		return $dialog
			.dialog({
				autoOpen: true,
				buttons: {
					"Save" : function (){
						
					},
					"Cancel": function(){
						$( this ).dialog( "close" );
					}
				}
			})
			.tabs();
	}

	$.litApp.Dialog = dialog;
})(jQuery);

jQuery(function($){
	var d = {
		tab1 : {
			label : "Tab 1"
		},
		tab2 : {
			label: "tab 2"
		},
		tab3: {	}
	};

	$.litApp.Dialog(d)
	//.dialog('open');	
});
