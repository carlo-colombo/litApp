(function($){
	var $topBar = $('<div class="topbar-wrapper" style="z-index: 5;">\
	    <div class="topbar" data-dropdown="dropdown">\
	      <div class="topbar-inner">\
	        <div class="container">\
	          <h3 class="brand"></h3>\
	          <ul class="nav">\
	          </ul>\
	        </div>\
	      </div>\
	    </div>\
	</div>');

  	$.litApp.Bar = function(prop){
		$topBar.find('h3').text(prop.title);
		$.each(prop.dialogs,function(i,d){
			var $a =$('<a>',{
				text : d.title,
				'class': 'btn info',
				'data-controls-modal': 'dialog_'+d.title.replace(' ','')
			});
			
			$.litApp.Dialog(d)
				.hide()
				.appendTo('body');
			
			$('<li>')
				.append($a)
				.appendTo($topBar.find('ul.nav'));
		});
		$topBar.appendTo('body');
  	}

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
		title: "Properties"
	};


	$.litApp.Bar({
		title: "Test",
		dialogs : [d]
	});
});