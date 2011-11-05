;(function(){
	yepnope([{
			test: true, //testing
			yep: [
				'http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js',
				'http://twitter.github.com/bootstrap/1.3.0/bootstrap-tabs.js',
				'http://twitter.github.com/bootstrap/1.3.0/bootstrap-modal.js',
				'/litapp/_design/litApp/litApp/litApp.js',
				'/litapp/_design/litApp/litApp/Control.js',
				'/litapp/_design/litApp/litApp/Dialog.js',
				'/litapp/_design/litApp/litApp/Bar.js',
				'http://twitter.github.com/bootstrap/1.3.0/bootstrap.min.css'
			],
			complete: function(){
				jQuery(function($){

					$.getJSON('/litapp/_design/litApp',function(design){
						
						var template = $('body').data('template');
						var templateDef = design.config.templates[template];
						var dialogs = design.config.dialog[templateDef.dialog || template];
						if(typeof(dialogs) == "object" ){
							dialogs = [dialogs]
						}

						$.litApp.Bar({
							title: "Test",
							dialogs : dialogs
						})
						.appendTo('body');	
					})
				});
			}
		}
	]);
})();