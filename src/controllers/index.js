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
    ,lib = require(path.resolve(__dirname+'/../../lib'));

function _init(cbk){
    // dynamically build controllers array for internal usage.
    fs.readdir(__dirname,function(err,l){
        l.forEach(function(ll){
            var js = path.basename(ll,'.js');
            if(!/index/i.test(js)){
                try{
                    lib.core.controllers.main[js]=require('./'+js);
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