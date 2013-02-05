module.exports = function(){
    return {
        merge:function(src,dst){
            var obj3 = {};
            for (var attrname in dst) {
                obj3[attrname] = dst[attrname];
            }
            for (var attrname in src) {
                if(typeof obj3[attrname]!=='undefined') continue;
                obj3[attrname] = src[attrname];
            }
            return obj3;
        }
    }
}