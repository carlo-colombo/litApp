;(function($){
	function dialog(dialog){
		var $dialog = $('<div>',{
				id:'dialog',
				title: dialog.title
			}).css({
				'font-size': 10
			});
		var $form = $('<form>')
			.append($('<ul>'))
			.appendTo($dialog);

		$.each(dialog.tabs,function(k,v){
			$('<li>').appendTo($dialog.find('ul'))
				.append($('<a>',{
					text: v.label || k,
					href: '#'+k
				}));

			$('<div>',{
				id: k,
				text: "prova " + k
			}).appendTo($form);
		});

		$dialog
			.dialog({
				autoOpen: false,
				width: dialog.width || 500,
				height:dialog.height ,
				buttons: {
					"Save" : dialog.saveHandler || function (){
						
					},
					"Cancel": function(){
						$( this ).dialog( "close" );
					}
				}
			});
		$form.tabs();
		return $dialog;
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
		},
		title: "Dialog"
	};

	$.litApp.Dialog(d)
		.dialog('open');
});
