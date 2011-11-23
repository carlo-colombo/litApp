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
                $('#tree').on('click','.open',function(){
                    var $this = $(this),
                        $li = $this.closest('li'),
                        $ul = $li.find('ul');

                    $this
                        .text('-')
                        .removeClass('open')
                        .addClass('info close-tree');
                    if($ul.length == 0){
                        $.ajax({
                            url: window.location.pathname+'Child?rows=true',
                            data: JSON.stringify({
                                "keys": $li.data('children').split(',')
                            }),
                            type: "post",
                            success: function(data){
                                $('<ul>')
                                    .append(data)
                                    .appendTo($li);
                            }
                        });
                    }else{
                        $ul.show();
                    }

                }).on('click','.close-tree',function(){
                    $(this)
                        .text('+')
                        .removeClass('close-tree info')
                        .addClass('open')
                        .closest('li')
                            .find('ul')
                                .hide()
                });

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
                    var $li = $(this).closest('li'),
                            id = $li.attr('id');
                    $.ajax({
                        url : self.design + '/_update/changeTemplate/' + id,
                        type: 'put',
                        data:{
                            template: $(this).val()
                        }
                    })
                }).on('dblclick','li > a',function(){
                    var $li = $(this).closest('li'),
                        id = $li.attr('id');
                    $.ajax({
                        url : self.design + '/_update/changeName/' + id,
                        type: 'put',
                        data:{
                            name: prompt("New name")
                        },
                        success: function(name){
                            $li.find('a.name').text(name);
                        }
                    });
                });
                    
                $('#tools').on('click','a.btn.new',function(){
                    $.post(self.design+'/_update/newPage');
                    return false;
                });    
            });
        }

        return this;
    }
})(jQuery);
