/**
 * Main core file for custom framework implementation.
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

/**
 * Extend base Object by adding additional methods.
 * An attribute named 'type' should be present (Compatibility issue with 
 * ORM module)
 */
//Object.prototype.apps = {
//    type:'object'
//}