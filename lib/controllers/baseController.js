var path = require('path')
        , core = require('../').core;

/**
 * Base controller.
 * 
 * This is the base class for all the controllers in the application.
 * Various helpful methods will be implemented from time to time, that will be made 
 * available to all controllers.
 * 
 * @author Nicolas Iglesias <nico@webpolis.com.ar> for daturajs - https://github.com/webpolis/daturajs -
 */
module.exports = function() {
    return {
        render: function(view, data) {
            data = data || {};
            var viewFile = null;

            // make component accesible to views
            this._response.locals['auth'] = this.auth !== null ? this.auth
                    : require(core.paths.components + '/auth').getInstance();

            // inject helpers
            this._response.locals = Object.merge(require(path.resolve(__dirname + '/../helpers')), this._response.locals);

            if (typeof view.layout !== 'undefined') {
                viewFile = path.resolve(__dirname + '/../../src/views/' + c + '/' + view.view);
                layoutFile = path.resolve(__dirname + '/../../src/views/layouts/' + view.layout);
                data.layout = layoutFile;
                this._response.render.call(this._response, viewFile, data);
            } else {
                viewFile = path.resolve(__dirname + '/../../src/views/' + this.$$name + '/' + view);
                this._response.render.call(this._response, viewFile, data);
            }
        },
        redirect: function(url) {
            return this._response.redirect(url);
        },
        set: function(key, val) {
            this._response.locals[key] = val;
        }
    }
}