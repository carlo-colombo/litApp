(function($){
    $.litApp = function(dbname,app,options){
        var that = this;
        that.options = {
            session: true
        };
        that.db = $.couch.db(dbname);
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
    }
})(jQuery);
