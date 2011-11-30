var startLitApp = function(designPath){

	jQuery(function($){
		$('html').bind('dataReady.litApp designReady.litApp',function(e,data){
			var $this=$(this);
			switch (e.type){
				case 'dataReady':
					$this.data('data',data);
					break;
				case 'designReady':
					$this.data('design',data);
					break;
			}

			if($this.data('data') && $this.data('design')){
				var data = $this.data('data'),
					design = $this.data('design'),
					template = $('body').data('template'),
					templateDef = design.config.templates[template],
					dialogs = design.config.dialog[templateDef.dialog || template];
				
				if(typeof(dialogs) == "object" ){
					dialogs = [dialogs];
				}

				$.litApp.Bar({
					dialogs : dialogs
				},data)
				.appendTo('body');
				$('body').css('paddingTop',40);
			}
		});
	});

	(function($){
		$.getJSON('/_session',function(session){
			var editMode = $.inArray('_admin',session.userCtx.roles) >=0
				|| $.inArray('_editor',session.userCtx.roles) >=0;

			if(editMode){
				$.getJSON('/'+designPath.split('/')[1] +'/' + $('body').data('id'),function(data){
					console.log('data ready');
					$('html').trigger('dataReady.litApp',data);
				});

				$.getJSON( designPath ,function(design){
					console.log('design ready');
					$('html').trigger('designReady.litApp',design);						
				});
			}
		});
	})(jQuery)
}