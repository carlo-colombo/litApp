(function($){
	var $bar = $('<div class="topbar-wrapper" style="z-index: 5;">\
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

  	$.litApp.Bar = function(prop,data){
		$bar.find('h3').text(prop.title);
		$.each(prop.dialogs,function(i,d){
			var $a =$('<a>',{
				text : d.title,
				'class': 'btn info',
				'data-controls-modal': 'dialog_'+d.title.replace(' ','')
			});
			
			$.litApp.Dialog(d,data)
				.hide()
				.appendTo($bar);
			
			$('<li>')
				.append($a)
				.appendTo($bar.find('ul.nav:eq(0)'));
		});
		return $bar;
  	}

})(jQuery);