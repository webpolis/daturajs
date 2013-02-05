/**
 * Controllers initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var fs = require('fs')
,models = require('../models')
,path = require('path')
,object = require('../components/object')
,vm = require('vm')
,lib = require(path.resolve(__dirname+'/../'));

function _init(cbk){
    // dynamically build controllers array for internal usage.
    fs.readdir(path.resolve(__dirname+'/../../src/controllers/'),function(err,l){
        l.forEach(function(ll){
            if(!(/^.*\.js$/i.test(ll)))
                return;
            
            var js = path.basename(ll,'.js');
            if(!/index/i.test(js)){
                try{
                    var cc = require(path.resolve(__dirname+'/../../src/controllers/'+js));
                    var base = require('./baseController');
                    var ccc = Object.merge(base(), cc());
                    
                    // extend controller's features
                    Object.defineProperty(ccc,'$$',{
                        value:{
                            models:models,
                            params:require(path.resolve(__dirname+'/../../src/config/main'))['main']['params']
                        },
                        writable:false,
                        configurable:false,
                        enumerable:false
                    });
                    Object.defineProperties(ccc,object);
                    
                    lib.core.controllers.main[js]=ccc;
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