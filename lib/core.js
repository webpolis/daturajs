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
    models:{},
    /**
     * A list of ORM models. This is only used internally, so you will not need it 
     * anyway.
     *
     * @property ormModels
     * @type {Array}
     */
    ormModels:{},
    controllers:{
        main:{},
        rest:{}
    },
    utils:{}
}