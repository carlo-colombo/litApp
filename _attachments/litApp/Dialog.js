;(function($){
	function dialog(dialog,data){
		var data = data || {};

		//dialog container
		var $dialog = $('<div>',{
				id: 'dialog_'+dialog.title.replace(' ',''),
				title: dialog.title,
				class:'modal'
			});
		
		//dialog header	
		$dialog.append($('<div class="modal-header">\
            <a href="#" class="close">x</a>\
            <h3>'+dialog.title+'</h3>\
        </div>'))

		//form
		var $form = $('<form>',{
			'class' : 'tab-content'
		});
		
		$dialog.append($('<div>',{
			'class': 'modal-body'
		}));

		$dialog
			.find('.modal-body')
			.append($('<ul>',{
				'class' :'tabs',
				'data-tabs' : 'tabs'
			}))
			.append($form);
		
		//tab creation
		$.each(dialog.tabs,function(k,v){
			$('<li>').appendTo($dialog.find('ul'))
				.append($('<a>',{
					text: v.label || k,
					href: '#'+k
				}));

			var $tab = $('<fieldset>',{
				id: k,
			}).appendTo($form);

			//field creation
			if(v.fields){
				$.each(v.fields,function(i,field){
					$.extend(field,{
						value: data[field.name] || field.value
					});
					$tab.append($.litApp.Controls[field.type](field));
				});
			}
		});

		$('<div class="modal-footer">\
            <a href="#" class="btn secondary cancel">Cancel</a>\
            <a href="#" class="btn primary save">Save</a>\
          </div>').appendTo($dialog);

		$dialog
			.find('li:eq(0)').addClass('active').end()
			.find('fieldset:eq(0)').addClass('active').end()
			.find('.btn.cancel').bind('click',function(){
				$(this).closest('.modal').modal('hide');
			}).end()
			.find('.btn.save').bind('click',function(){

				var obj = {};
				$.each($(this).find('form').serializeArray(),function(k,v){
					obj[v.name]=v.value;
				});

				console.log(obj);

				$(this).closest('.modal').modal('hide');
			}).end();

		return $dialog.modal({
			backdrop:true
		});
	}

	$.litApp.Dialog = dialog;
})(jQuery);