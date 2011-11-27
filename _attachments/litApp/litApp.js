(function($){

    var defaultOpts = {
        "db" : "litapp",
        "design": "/_design/litApp",
        "paths" : {
            "subtree" : "/_list/tree/treeChild?rows=true"
        },
        "lists" : {
            "tree" : "litApp/tree"            
        },
        "views" : {
            "subtree" : "treeChild" 
        }
    }

    $.litApp = function(options){
        
        var self = this;

        self.options = $.extend(defaultOpts,options);
        self.options.connection = "/" 
            + self.options.db
            + self.options.design;
        self.db = $.couch.db(self.options.db);

        /**
        *
        */
        this.admin = function(){

            _openCloseSubtrees.apply(this);

            $.getJSON(self.options.connection,function(ddoc){
                $('#tree').on('click','a[href=#new]',function(){
                    var $tr = $(this).closest('tr'),
                        id = $tr.attr('id'),
                        path = $tr.data('path');

                        $.post(self.options.design + '/_update/newPage',{
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
                        var $li = $(this).closest('li'),
                            id = $li.attr('id'),
                            rev = $li.data('rev');
                        $.ajax({
                           url: '/' + ddoc.db + '/' + id,
                           type: 'delete',
                           headers: {
                               'If-Match': rev
                           },
                           success: function(){
                               $li.remove();
                           }
                        });
                    }
                }).on('change','select[name=template]',function(){
                    var $li = $(this).closest('li'),
                            id = $li.attr('id');
                    $.ajax({
                        url : self.options.design + '/_update/changeTemplate/' + id,
                        type: 'put',
                        data:{
                            template: $(this).val()
                        }
                    })
                }).on('dblclick','li > a',function(){
                    var $li = $(this).closest('li'),
                        id = $li.attr('id');
                    $.ajax({
                        url : self.options.design + '/_update/changeName/' + id,
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
                    $.post(self.options.design+'/_update/newPage');
                    return false;
                });    
            });
        }

        var _openCloseSubtrees = function(){
            $('#tree').on('click','.open',function(){
                var $this = $(this),
                    $li = $this.closest('li'), 
                    $ul = $li.find('ul');

                $this
                    .text('-')
                    .removeClass('open')
                    .addClass('info close-tree');
                    
                if($ul.length == 0){
                    self.db.list(
                        self.options.lists.tree,
                        self.options.views.subtree,{
                            rows : true,
                            keys : $li.data('children').split(',')
                    },{
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
        }

        return this;
    }
})(jQuery);
