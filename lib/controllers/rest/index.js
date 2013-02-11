/**
 * REST Controllers initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var fs = require('fs')
,path = require('path')
,models = require(path.resolve(__dirname+'/../../models'))
,object = require('../../components/object')
,vm = require('vm')
,lib = require(path.resolve(__dirname+'/../../'));

function _init(cbk){
    /**
     * Used internally.
     *
     * @method  _defineAndFinish
     * @param   {Object}    Controller object.
     * @param   {String}    Controller's name.
     * @private
     */
    var _defineAndFinish = function(ccc, js){
        // extend controller's features
        Object.defineProperty(ccc,'$$',{
            value:{
                models:models,
                params:require(path.resolve(__dirname+'/../../../src/config/main'))['main']['params']
            },
            writable:false,
            configurable:false,
            enumerable:false
        });
        Object.defineProperties(ccc,object);

        lib.core.controllers.rest[js]=ccc;
    }
    
    // dynamically build controllers array for internal usage.
    fs.readdir(path.resolve(__dirname+'/../../../src/controllers/rest/'),function(err,l){
        l.forEach(function(ll){
            if(!(/^.*\.js$/i.test(ll)))
                return;

            var js = path.basename(ll,'.js');
            
            if(!/index|baseController/i.test(js)){
                try{
                    var cc = require(path.resolve(__dirname+'/../../../src/controllers/rest/'+js));
                    var base = require('./baseController');
                    var ccc = Object.merge(base(), cc());

                    var userBaseC = path.resolve(__dirname+'/../../../src/controllers/rest/baseController.js');
                    fs.exists(userBaseC,function(exists){
                        if(exists){
                            var uc = require(userBaseC)();
                            ccc = Object.merge(ccc, uc);
                        }
                        
                        _defineAndFinish(ccc, js);
                    });
                }catch(e){
                    console.log('[error] '+e.message);
                }
            } 
        });
        cbk();
    });
}

module.exports = {
    init:_init
}