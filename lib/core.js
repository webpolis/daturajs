/**
 * Main core file for custom framework implementation.
 * 
 * This module exports an object which have access to different components and 
 * helpers to be made available to either models or controllers.
 * Also, it stores a reference to existing models so they can be accessed from any controller 
 * via this.$$.models.
 * 
 * @author Nicolas Iglesias <nicolas@cleversight.biz>
 */
module.exports = {
    models:{},
    controllers:{
        main:{},
        rest:{}
    },
    utils:{}
}