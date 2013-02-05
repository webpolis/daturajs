/**
 * REST Controllers initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var fs = require('fs')
,path = require('path')
,object = require('../../utils/object')
,vm = require('vm')
,lib = require(path.resolve(__dirname+'/../../'));

function _init(cbk){
    // dynamically build controllers array for internal usage.
    fs.readdir(path.resolve(__dirname+'/../../../src/controllers/rest/'),function(err,l){
        l.forEach(function(ll){
            if(!(/^.*\.js$/i.test(ll)))
                return;
            
            var js = path.basename(ll,'.js');
            if(!/index/i.test(js)){
                try{
                    var cc = require(path.resolve(__dirname+'/../../../src/controllers/rest/'+js));
                    var base = require('./baseController');
                    var ccc = function(){
                        var _ = object().merge(base(), cc());
                        return _
                    }
                    lib.core.controllers.rest[js]=ccc;
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