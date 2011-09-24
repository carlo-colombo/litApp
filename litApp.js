(function($){
    $.litApp = function(dbname,app,options){
        var that = this;
        that.options = {
            session: true,
            localStorage: 'localStorage' in window 
                && window['localStorage'] !== null ,
            debug: true
        };

        //enabling ajax request loggin if debug=true
        if(!!debug && window.console){
            $.ajaxSetup({
               success: function(message,status,response){
                    console.log(message,status,response);
               }
            });
        }
        
        that.db = $.couch.db(dbname);
        
        //extends $.couch.db with docInfo method, HEAD method
        $.extend(that.db,{
            docInfo: function(id,options){
                $.ajax($.extend(options,{
                    url: this.uri + encodeURIComponent(id),
                    type: 'head'
                }));    
            }
        });
        
        that.db.openDoc('_design/'+app,{success:function(design){
           $.extend(that.options,design,options);
           
           if(!!that.options.session){
              $.couch.session({
                    success:function(data){
                        that.session = data;
                        $(window).trigger('sessionReady.litApp',that);
                    }
              });
           }
           
           if (typeof that.options.designReadyCallback ==='function'){
               that.options.designReadyCallback.call(that);
           }else{
                $(window).trigger('designReady.litApp',that);
            }
        }});
        
        $.extend(that,{
            openDoc:openDoc
        })
    }
    
    var openDoc =function(id){
        var that=this;
        if(window.navigator.onLine){
            that.db.head(id);
        }
    }
    
    function trigger(event){
        return function(data){
            $(window).trigger(event,data);
        }
    }
})(jQuery);
