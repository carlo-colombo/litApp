;(function($){
	function dialog(dialog,data){
		var data = data || {};
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
					$.extend(field,{
						value: data[field.name] || field.value
					});
					$tab.append($.litApp.Controls[field.type](field));
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
						name: 'name',
						type: 'text',
						placeholder: 'Insert name here'
					},
					{
						name: 'class',
						type: 'text',
					},
					{
						name: 'level',
						type: 'number',
						max:30,
						min:1,
						value: 1
					},
					{
						name: 'power',
						type: 'textarea',
						help: 'Evaluated as markdown',
						rows: 8
					},
					{
						name: 'nascosto',
						type: 'hidden',
						value: 'nascosto'
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

	$.litApp.Dialog(d,{
		'class': 'Cleric',
		'level': 11,
		'power' : 'lonnnggg   te x   x  t  t  e   g fsfgsg s df  '
	})
		.dialog('open');
});
