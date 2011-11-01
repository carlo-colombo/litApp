;(function($){
	function makeInput(control){
		return $('<input>',{
				type: control.type  == 'edit' ? 'text': control.type,
				value: control.default,
				id: control.name,
				name : control.name,
				placeholder: control.description
			});
	}

	$.litApp.Controls = {};

	//export control type
	$.each(['edit','text','time', 'password', 'email'],function(i,ctrl){
		$.litApp.Controls[ctrl] = makeInput;		
	});
})(jQuery);