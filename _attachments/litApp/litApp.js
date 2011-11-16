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
                    if(confirm('Are you sure?')){
                        var $tr = $(this).closest('tr'),
                            id = $tr.attr('id'),
                            rev = $tr.data('rev');
                        $.ajax({
                           url: '/' + ddoc.db + '/' + id,
                           type: 'delete',
                           headers: {
                               'If-Match': rev
                           },
                           success: function(){
                               $tr.remove();
                           }
                        });
                    }
                }).find('a[href=#new]')
                    .addClass('success').end()
                .find('a[href=#delete]')
                    .addClass('important');
                    
                $('#tools').on('click','a.btn.new',function(){
                    $.post(self.design+'/_update/newPage');
                    return false;
                });    
            });            
        }

        return this;
    }
})(jQuery);
