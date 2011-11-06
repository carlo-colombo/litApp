;(function(){

	yepnope([{
		load: 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js',
		complete: function(){
			if(window.jQuery){
				jQuery(function(){
					console.log('domready');
				})

				jQuery.getJSON('/_session',function(session){
					var editMode = jQuery.inArray('_admin',session.userCtx.roles) ||
						jQuery.inArray('_editor',session.userCtx.roles),
						design = {} ;

					if(editMode){
						$.getJSON('/litapp/_design/litApp',function(d){
							design = d;						
						});
					}

					yepnope([{
						test: editMode,
						yep: [
							'http://twitter.github.com/bootstrap/1.4.0/bootstrap-tabs.js',
							'http://twitter.github.com/bootstrap/1.4.0/bootstrap-modal.js',
							'/litapp/_design/litApp/litApp/litApp.js',
							'/litapp/_design/litApp/litApp/Control.js',
							'/litapp/_design/litApp/litApp/Dialog.js',
							'/litapp/_design/litApp/litApp/Bar.js',
							'http://twitter.github.com/bootstrap/1.4.0/bootstrap.min.css'
						],
						complete: function(){
							jQuery(function($){
								var template = $('body').data('template'),
									templateDef = design.config.templates[template],
									dialogs = design.config.dialog[templateDef.dialog || template];
								
								if(typeof(dialogs) == "object" ){
									dialogs = [dialogs];
								}

								$.litApp.Bar({
									title: "Test",
									dialogs : dialogs
								})
								.appendTo('body');
								$('body').css('paddingTop',40);
							});
						}
					}]);
				});
			}
		}
	}])
})();