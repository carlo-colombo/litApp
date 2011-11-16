(function($){
    $.litApp = function(design){
        
        var self = this;
        /**
        * init
        */
        self.design = design;
        
        /**
        *
        */
        this.admin = function(){
            $.getJSON(self.design,function(ddoc){
                $('#tree').on('click','a[href=#new]',function(){
                    var $tr = $(this).closest('tr'),
                        path = $tr.data('path').split(',');

                        $.post(self.design+'/_update/newPage',{
                            path: path.join(',')
                        },function(res){
                            console.log(res);
                        });

                }).on('click','a[href=#delete]',function(){
                    var $tr = $(this).closest('tr'),
                        id = $tr.attr('id'),
                        rev = $tr.data('rev');
                    $.ajax({
                       url: '/' + ddoc.db + '/' + id,
                       type: 'delete',
                       data: {
                           rev: rev
                       },
                       success: function(){
                           $(this).slideUp().remove();
                       }
                    });
                }).find('a[href=#new]')
                    .addClass('success').end()
                .find('a[href=#delete]')
                    .addClass('important');    
            });            
        }

        return this;
    }
})(jQuery);
