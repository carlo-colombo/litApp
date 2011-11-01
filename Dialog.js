;(function($){
	function dialog(dialog){
		var $dialog = $('<form>',{id:'dialog'})
				.append($('<ul>'));

		$.each(dialog.tabs,function(k,v){
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

		$dialog
			.dialog({
				autoOpen: false,
				buttons: {
					"Save" : dialog.saveHandler || function (){
						
					},
					"Cancel": function(){
						$( this ).dialog( "close" );
					}
				}
			});
		return $dialog.tabs();
	}

	$.litApp.Dialog = dialog;
})(jQuery);


//test
jQuery(function($){
	var d = {
		tabs:{
			tab1 : {
				label : "Tab 1"
			},
			tab2 : {
				label: "tab 2"
			},
			tab3: {	}
		}
	};

	$.litApp.Dialog(d)
		.dialog('open');	
});
