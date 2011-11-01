;(function($){
	function dialog(dialog,data){
		var data = data || {};

		//dialog container
		var $dialog = $('<div>',{
				id:'dialog',
				title: dialog.title
			}).css({
				'font-size': 10
			});

		//form
		var $form = $('<form>')
			.append($('<ul>'))
			.appendTo($dialog);
		
		//tab creation
		$.each(dialog.tabs,function(k,v){
			$('<li>').appendTo($dialog.find('ul'))
				.append($('<a>',{
					text: v.label || k,
					href: '#'+k
				}));

			var $tab = $('<fieldset>',{
				id: k,
			}).appendTo($form);

			//field creation
			if(v.fields){
				$.each(v.fields,function(i,field){
					$.extend(field,{
						value: data[field.name] || field.value
					});
					$tab.append($.litApp.Controls[field.type](field));
				});
			}
		});

		//dialog creation
		$dialog
			.dialog({
				autoOpen: false,
				width: dialog.width || 500,
				height:dialog.height ,
				buttons: {
					"Save" : dialog.saveHandler || function (){
						var obj = {};
						$.each($(this).find('form').serializeArray(),function(k,v){
							obj[v.name]=v.value;
						});

						console.log(obj);
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