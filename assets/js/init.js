(function($){
    $.resizeEnd = function(el, options){
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data("resizeEnd", base);
        base.rtime = new Date(1, 1, 2000, 12,00,00);
        base.timeout = false;
        base.delta = 300;
        
        base.init = function(){
            base.options = $.extend({},$.resizeEnd.defaultOptions, options);
            
            if(base.options.runOnStart) base.options.onDragEnd();
            
            $(base.el).resize(function() {
                
                base.rtime = new Date();
                if (base.timeout === false) {
                    base.timeout = true;
                    setTimeout(base.resizeEnd, base.delta);
                }
            });
        
        };
        base.resizeEnd = function() {
            if (new Date() - base.rtime < base.delta) {
                setTimeout(base.resizeEnd, base.delta);
            } else {
                base.timeout = false;
                base.options.onDragEnd();
            }                
        };
        
        base.init();
    };
    
    $.resizeEnd.defaultOptions = {
        onDragEnd : function() {},
        runOnStart : false
    };
    
    $.fn.resizeEnd = function(options){
        return this.each(function(){
            (new $.resizeEnd(this, options));
        });
    };
    
})(jQuery);


$(document).ready(function() {

	$("<div class='holyshit' />").appendTo("body");

});

$(window).resize(function() {
	$(".holyshit").addClass("resizing");
});

$(window).resizeEnd(
      {
            onDragEnd : function() {  $(".holyshit").removeClass("resizing"); },
            runOnStart : true
      }
);
