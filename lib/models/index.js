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
        if(!/index/i.test(j)){
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
    if(typeof lib.core.ormModels !== 'undefined'){
        for(var modelName in lib.core.ormModels){
            var ormModel = lib.core.ormModels[modelName];
            
            for(var relType in lib.core.ormModels[modelName]._customRelationships){
                var rel = lib.core.ormModels[modelName]._customRelationships;
                if(rel[relType].length >0){
                    rel[relType].forEach(function(r){
                        
                        switch(config.adapter){
                            case 'sequelize':
                                // config relation
                                var relConfig = {
                                    as: rel.alias ? r.alias : r.model,
                                    foreignKey : r.foreignKey ? r.foreignKey : r.model+'_id'
                                };
                        
                                // self-to-self relation
                                if(r.selfRelationship)
                                    relConfig.useJunctionTable = false
                        
                                // many-to-many relation
                                if(r.joinTable)
                                    relConfig.joinTableName = r.joinTable
                        
                                // set relation
                                ormModel[relType](lib.core.ormModels[r.model], relConfig);
                                break;
                        }
                    });
                }
            }
            
            // build new instance of local model
            var model = db().getLocalModelFromORM(ormModel);
            lib.core.models[ormModel.name] = model;
        }
    }
});

module.exports = lib.core.models;