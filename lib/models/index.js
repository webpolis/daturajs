/**
 * Models initialization file.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var fs = require('fs')
,path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main')).main.db
,lib = require(path.resolve(__dirname+'/../'))
,db = require(path.resolve(__dirname+'/../adapters/db'));

// initialize sequelize.
var dbAdapter = db().initialize();

// dynamically build models array for internal usage.
fs.readdir(path.resolve(__dirname+'/../../src/models'),function(err,l){
    l.forEach(function(j){
        j = path.basename(j,'.js');
        if(!/index|baseModel/i.test(j)){
            try{
                // get instance per orm
                var ormModel = db().loadORMModel(j);
                lib.core.ormModels[ormModel.name]=ormModel;
            }catch(e){
                console.trace(e)
            }
        } 
    });
    
    // setup relationships (must be done here so we can access all models instances).
    db().setupRelationships();
    
    // inherit custom baseModel
    if(lib.core.models.length > 0){
        var baseModel = require(path.resolve(__dirname+'/../../src/models/baseModel'));
        
        lib.core.models.forEach(function(m){
            m = Object.merge(baseModel(), m());
        });
    }
});

module.exports = lib.core.models;