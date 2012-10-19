var merge$ = function() {
    function isNestedObject(obj) {
        return (obj !== null && 
                obj !== undefined && 
                typeof obj === 'object' && 
                !(obj instanceof Array));
    }

		function hasOwnProp(source, property) {
			var hasProp = false;
			if(property.match(/^merge/)) return hasProp;
			try{ hasProp = source.hasOwnProperty(property); } catch(e){ hasProp = !!source[property]; }
			return hasProp;
		}
    
    var args = Array.prototype.slice.call(arguments);
    var target = args[0];
    var source;
    
    for (var i=1,length=args.length; i<length; i++) {
        source = args[i];
        if (source) {
            for (var property in source) {
                if (hasOwnProp(source, property)) {
                    if (isNestedObject(target[property]) && isNestedObject(source[property])) {
                        target[property] = merge(target[property],source[property]);
                    } else {
                        target[property] = source[property];
                    }
                }
            }
        }
    }
    return target;
};

var merge = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift({});
    return merge$.apply(null,args);
};

module.exports = merge;
