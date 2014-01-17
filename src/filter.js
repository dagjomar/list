module.exports = function(list) {

    // Add handlers
    list.handlers.filterStart = list.handlers.filterStart || [];
    list.handlers.filterComplete = list.handlers.filterComplete || [];

    return function(filterFunction) {
        list.trigger('filterStart');
        list.i = 1; // Reset paging
        list.reset.filter();
        if (filterFunction === undefined) {
            list.filtered = false;
        } else {
            list.filtered = true;
            var is = list.items;
            for (var i = 0, il = is.length; i < il; i++) {
                var item = is[i];

                var pass = true;

                if( Object.prototype.toString.call( filterFunction ) === '[object Array]' ) {
                    var n = 0;
                    while( n < filterFunction.length && pass ){ //While item passes filterFunctions, we continue. No need to continue checking filters if it fails an early filter function
                        pass = filterFunction[n](item);
                        n++
                    }
                }else{
                    pass = filterFunction(item);
                }
                
                if (pass) item.filtered = true;
                else item.filtered = false;

            }
        }
        list.update();
        list.trigger('filterComplete');
        return list.visibleItems;
    };
};