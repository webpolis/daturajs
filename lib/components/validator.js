/**
 * Validation module.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 * @module  validator
 */
var path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main')).main.auth
,db = require(path.resolve(__dirname+'/../adapters/db'));

/**
 * @class validator
 */
module.exports = function(){
    return{
    }
}