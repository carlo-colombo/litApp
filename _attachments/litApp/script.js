;(function(){
	yepnope([{
			test: true, //testing
			yep: [
				'http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js',
				'http://twitter.github.com/bootstrap/1.3.0/bootstrap-tabs.js',
				'http://twitter.github.com/bootstrap/1.3.0/bootstrap-modal.js',
				'litApp.js',
				'Control.js', 'Dialog.js','Bar.js',
				'http://twitter.github.com/bootstrap/1.3.0/bootstrap.min.css'
			],
			complete: function(){
				jQuery(function($){
					$.litApp.Bar({
						title: "Test",
						dialogs : [d]
					})
					.appendTo('body');
				});
			}
		}
	]);
})();