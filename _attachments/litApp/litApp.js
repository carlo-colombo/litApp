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
                        id = $tr.attr('id'),
                        path = $tr.data('path');

                        $.post(self.design + '/_update/newPage',{
                            path: path
                        },function(res){
                            $.ajax({
                                url: self.design + '/_update/addChild/'+id, 
                                type:'put',
                                data: {
                                    child:res
                                }
                            });
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
                }).on('change','select[name=template]',function(){
                    var $tr = $(this).closest('tr'),
                            id = $tr.attr('id');
                    $.ajax({
                        url : self.design + '/_update/changeTemplate/' + id,
                        type: 'put',
                        data:{
                            template: $(this).val()
                        }
                    })
                }).on('dblclick','td',function(){
                    var $tr = $(this).closest('tr'),
                        id = $tr.attr('id');
                    $.ajax({
                        url : self.design + '/_update/changeName/' + id,
                        type: 'put',
                        data:{
                            name: prompt("New name")
                        },
                        success: function(name){
                            $tr.find('.name > a').text(name);
                        }
                    });
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
