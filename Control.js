;(function($){
	function makeInput(control){
		var prop = $.extend(control,{
			id: control.name,
			placeholder: control.description
		});

		return $('<input>',prop);
	}

	$.litApp.Controls = {};

	//export control type
	$.each(['text','time','date','datetime', 'password', 'email','range','number'],function(i,ctrl){
		$.litApp.Controls[ctrl] = field;
	});

	function field (control) {
		var label = control.label || function(name){
			return name.charAt(0).toUpperCase()
				+ name.substring(1);
		}

		var $input = makeInput(control);
		var $field = $('<div>').append($('<label>',{
			for: control.name,
			text: typeof label == "function" ? label(control.name) : label 
		})).append($('<div>',{class : 'input' }).append($input));

		return $field;
	}
})(jQuery);