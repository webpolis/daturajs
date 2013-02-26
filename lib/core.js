/**
 * Main core file for custom framework implementation.
 * 
 * This module exports an object which have access to different components and 
 * helpers to be made available to either models or controllers.
 * Also, it stores a reference to existing models so they can be accessed from any controller 
 * via this.models.
 * 
 * @author  Nicolas Iglesias <nicolas@cleversight.biz>
 * @module  core
 */

var path = require('path');

/**
 * @class core
 */
module.exports = {
    /**
     * A list of models classes to be accesed statically from any controller.
     * Example:
     * 
     * this.models.myModel
     *
     * @property models
     * @type {Array}
     */
    models: {},
    /**
     * A list of ORM models. This is only used internally, so you will not need it 
     * anyway.
     *
     * @property ormModels
     * @type {Array}
     */
    ormModels: {},
    controllers: {
        main: {},
        rest: {}
    },
    utils: {},
    paths: {}
}

// read only
Object.defineProperties(module.exports.paths, {
    lib: {
        value: path.resolve(__dirname),
        configurable: false,
        writable: false
    },
    adapters: {
        value: path.resolve(__dirname + '/adapters'),
        configurable: false,
        writable: false
    },
    components: {
        value: path.resolve(__dirname + '/components'),
        configurable: false,
        writable: false
    },
    console: {
        value: path.resolve(__dirname + '/console'),
        configurable: false,
        writable: false
    },
    helpers: {
        value: path.resolve(__dirname + '/helpers'),
        configurable: false,
        writable: false
    },
    src: {
        value: path.resolve(__dirname + '/../src'),
        configurable: false,
        writable: false
    },
    assets: {
        value: path.resolve(__dirname + '/../src/assets'),
        configurable: false,
        writable: false
    },
    public: {
        value: path.resolve(__dirname + '/../public'),
        configurable: false,
        writable: false
    },
})
