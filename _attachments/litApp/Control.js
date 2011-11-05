;(function($){

	$.litApp.Controls = {};

	//export control type
	$.each(['text','time','date','datetime', 'password', 'email','range','number'],function(i,ctrl){
		$.litApp.Controls[ctrl] = field(input);
	});

	//textarea control
	$.litApp.Controls['textarea'] = field(function(control){
		var prop = $.extend(control,{
			id: control.name,
			text: control.value
		});

		return $('<textarea>',prop);
	});

	//input type hidden doesn't need field
	$.litApp.Controls['hidden'] = input;

	function input(control){
		var prop = $.extend(control,{
			id: control.name,
		});

		return $('<input>',prop);
	}

	function field (makeInput) {
		return function(control){
			var label = control.label || function(name){
				return name.charAt(0).toUpperCase()
					+ name.substring(1);
			}

			var $input = makeInput(control);
			var $field = $('<div>').append($('<label>',{
				for: control.name,
				text: typeof label == "function" ? label(control.name) : label 
			}));
			$('<div>',{class : 'input' })
				.append($input)
				.append(control.help &&
					$('<span>',{
						text: control.help,
						'class': 'help-block'
					}))
			.appendTo($field);

			return $field;
		}
	}
})(jQuery);