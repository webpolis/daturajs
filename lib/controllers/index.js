/**
 * Controllers initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nico@webpolis.com.ar>
 */
var fs = require('fs')
        , models = require('../models')
        , path = require('path')
        , lib = require(path.resolve(__dirname + '/../'))
        , object = require(lib.core.paths.components + '/object')
        , vm = require('vm');

function _init(cbk) {
    /**
     * Used internally.
     *
     * @method  _defineAndFinish
     * @param   {Object}    Controller object.
     * @param   {String}    Controller's name.
     * @private
     */
    var _defineAndFinish = function(ccc, js) {
        // extend controller's features
        Object.defineProperty(ccc, 'models', {
            value: models,
            writable: false,
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(ccc, 'vars', {
            value: require(path.resolve(lib.core.paths.src + '/config/main'))['main']['params'],
            writable: false,
            configurable: false,
            enumerable: true
        });

        Object.defineProperties(ccc, object);

        lib.core.controllers.main[js] = ccc;
    }

    // dynamically build controllers array for internal usage.
    fs.readdir(path.resolve(lib.core.paths.src + '/controllers/'), function(err, l) {
        l.forEach(function(ll) {
            if (!(/^.*\.js$/i.test(ll)))
                return;

            var js = path.basename(ll, '.js');

            if (!/index|baseController/i.test(js)) {
                try {
                    var cc = require(path.resolve(lib.core.paths.src + '/controllers/' + js));
                    var base = require('./baseController');
                    var ccc = Object.merge(base(), cc());

                    Object.defineProperty(ccc, '$$name', {
                        value: js.replace(/^(.*)Controller$/g, '$1'),
                        writable: false,
                        configurable: false,
                        enumerable: true
                    });

                    // implement custom base controller's methods
                    var userBaseC = path.resolve(lib.core.paths.src + '/controllers/baseController');
                    var uc = require(userBaseC);
                    ccc = Object.merge(ccc, uc());

                    _defineAndFinish(ccc, js);
                } catch (e) {
                    console.trace(e);
                }
            }
        });
        cbk();
    });
}

module.exports = {
    init: _init
}