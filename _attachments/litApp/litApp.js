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
                    var $li = $(this).closest('li'),
                        id = $li.attr('id'),
                        path = $li.data('path'),
                        $ul = $li.find('ul');

                        $.post(self.options.connection + '/_update/newPage',{
                            path: path
                        }, function(res){
                            $.ajax({
                                url: self.options.connection + '/_update/addChild/'+id, 
                                type:'put',
                                data: {
                                    child:res
                                }
                            });
                            
                            if ($ul.length == 0){
                                if(!$li.data('children')){
                                    $ul = $('<ul>').appendTo($li);        
                                }else{
                                    $li.find('.open-switch').trigger('click');                                    
                                    return;
                                }
                            }
                            _subtree($li, $ul, {
                                keys : [res]
                            });
                        });

                }).on('click','a[href=#delete]',function(){

                    if(confirm('Are you sure?')){
                        var $li = $(this).closest('li'),
                            id  = $li.attr('id'),
                            $parentLi = $li.parent().closest('li');
                        
                        _delete($li);
                        
                        if($parentLi.length){
                            $.ajax({
                                url: self.options.connection 
                                    + '/_update/removeChild/'
                                    + $parentLi.attr('id'), 
                                type:'put',
                                data: {
                                    child:id
                                },
                                success: function(children){
                                    $parentLi.data('children',children);        
                                }
                            });
                        }
                    }

                }).on('change','select[name=template]',function(){
                    var $li = $(this).closest('li'),
                            id = $li.attr('id');
                    $.ajax({
                        url : self.options.connection + '/_update/changeTemplate/' + id,
                        type: 'put',
                        data:{
                            template: $(this).val()
                        }
                    })
                }).on('dblclick','li > a',function(){
                    var $li = $(this).closest('li'),
                        id = $li.attr('id');
                    $.ajax({
                        url : self.options.connection + '/_update/changeName/' + id,
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
                    $.post(self.options.connection+'/_update/newPage',function(data){
                        _subtree(null, $('#tree').find('ul'), {
                            keys: [data]
                        })
                    });
                    return false;
                });    
            });
        }

        this.mainBar = function(){
            
        }

        var _subtree = function($li, $ul, data){
            self.db.list(
                self.options.lists.tree,
                self.options.views.subtree, 
                $.extend({
                    rows: true
                },data),{
                    success: function(data){
                        if($li){
                            $ul.append(data).appendTo($li);
                        }else{
                            $(data).appendTo($ul);
                        }
                    }
                }
            );
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
                    _subtree($li, $('<ul>'), {
                        keys : $li.data('children').split(',')
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

        var _delete = function($li){
            $li.find('li').each(function(i,el){
                _delete($(el)); 

            });
            self.db.removeDoc({
               _id : $li.attr('id'),
               _rev: $li.data('rev') 
            },{
                success: function(){
                    $li.remove();
                }
            });
        }

        return this;
    }
})(jQuery);
