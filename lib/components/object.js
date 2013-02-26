/**
 * Low level Javascript Object manipulation.
 * Various tools and added features applied to the most basic form of framework's objects.
 * 
 * Handle with care.
 * 
 * @author Nicolas Iglesias <nicolas@cleversight.com>
 */
Object.defineProperty(Object.prototype, 'merge', {
    value: function(src, dst) {
        var ret = {};
        Object.getOwnPropertyNames(dst).forEach(function(p) {
            Object.defineProperty(ret, p, Object.getOwnPropertyDescriptor(dst, p));
        })
        Object.getOwnPropertyNames(src).forEach(function(p) {
            if (typeof ret[p] !== 'undefined')
                return;

            Object.defineProperty(ret, p, Object.getOwnPropertyDescriptor(src, p));
        })

        return ret;
    },
    writable: false,
    configurable: false,
    enumerable: false
});

Object.defineProperty(Object.prototype, 'clone', {
    value: function(o) {
        var n = Object.create(Object.getPrototypeOf(o));
        var props = Object.getOwnPropertyNames(o);
        var pName;
        for (var p in props) {
            pName = props[p];
            Object.defineProperty(n, pName, Object.getOwnPropertyDescriptor(o, pName));
        }
        ;
        return n;
    },
    writable: false,
    configurable: false,
    enumerable: false
});

module.exports = {
    "_id": {
        value: Date.now() * Math.ceil(Math.random() * 100 ^ 3),
        writable: false,
        configurable: false,
        enumerable: true
    }
}