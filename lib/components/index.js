/**
 * Components initialization.
 * 
 * Components libraries will be instantiated here.
 * 
 * @author Nicolas Iglesias <nico@webpolis.com.ar>
 */

exports.auth = require('./auth').getInstance();
exports.grid = require('./grid');