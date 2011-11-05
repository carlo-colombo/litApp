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
        if(!!that.options.debug && window.console){
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
    
    var openDoc =function(id,options){
        var options = options || {};
        var that=this;
        if(window.navigator.onLine && that.options.localStorage){
            that.db.docInfo(id,{
                success: function(m,s,response){
                    var _rev = response.getResponseHeader("ETag").replace(/\"/g,""),
                        _id=localStorage[_rev];
                    if(_id){
                        if($.isFunction(options.success)){
                            options.success.call(localStorage[_id]);
                        }
                    }else{
                        that.db.openDoc(id,$.extend({
                            success: function(data,status,response){
                                localStorage[id]=data;
                                localStorage[data._rev]=id;
                                if($.isFunction(options.success)){
                                    options.success.call(data,status,response);
                                }
                            }
                        },options));
                    }
                }
            });
        }else if(that.options.localStorage){
            if($.isFunction(options.success)){
                options.success.call(localStorage[id]);
            }
        }else if(window.navigator.onLine){
            that.db.openDoc(id,options);
        }
        else{
            log("Offline and without localStorage")
        }
    }
    
    function trigger(event){
        return function(data){
            $(window).trigger(event,data);
        }
    }
    
    function log(){
        if(window.console){
            console.log(arguments);
        }
    }
})(jQuery);
