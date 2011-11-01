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

			var $tab = $('<fieldset>',{
				id: k,
			}).appendTo($form);

			if(v.fields){
				$.each(v.fields,function(i,field){
					var $input = $.litApp.Controls[field.type](field);
					var $field = $('<div>').append($('<label>',{
						for: field.name,
						text: field.label || field.name
					})).append($('<div>',{class : 'input' }).append($input));
					$tab.append($field);
				});
			}
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
				label : "Tab 1",
				fields:[
					{
						name: 'Name',
						row:1,
						type: 'edit',
						description: 'Insert name here'
					}
				]
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
