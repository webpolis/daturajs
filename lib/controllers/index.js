/**
 * Controllers initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
fs = require('fs')
    ,path = require('path')
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
                    var cp = path.resolve(__dirname+'/../../src/controllers/'+js);
                    lib.core.controllers.main[js]=require(cp);
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