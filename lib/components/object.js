/**
 * Low level Javascript Object manipulation.
 * Handle with care.
 * 
 * @author Nicolas Iglesias <nicolas@cleversight.com>
 */
Object.defineProperty(Object.prototype, 'merge',{
    value: function(src,dst){
        var ret = {};
        for (var attr in dst) {
            ret[attr] = dst[attr];
        }
        for (var attr in src) {
            if(typeof ret[attr]!=='undefined') continue;
            
            ret[attr] = src[attr];
        }
        return ret;
    },
    writable: false,
    configurable: false,
    enumerable: false
});


module.exports = {
    "_id":{
        value:Date.now(),
        writable:false,
        configurable:false,
        enumerable:true
    }
}