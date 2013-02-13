/**
 * Database adapter.
 * 
 * This adapter acts as a proxy within your application and the ORM module chosen.
 * Currently it only supports Sequelize - http://www.sequelizejs.com/ - but more 
 * will be added in the future.
 * 
 * Supported addapters' strings: sequelize
 * 
 * @module  db
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var seq = require('sequelize')
,path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main')).main.db
,inflector = require('inflector')
,lib = require(path.resolve(__dirname+'/../'))
,_adapter = null, _instance = null;

/**
 * @class   db
 */
module.exports = function(){
    /**
     * Will make available all the relationships for the final model object.
     * 
     * @method  _defineRelationsGettersAndSetters
     * @private
     * @param   {Object}    The ORM model's instance.
     * @param   {Object}    The final model's instance.
     */
    var _defineRelationsGettersAndSetters = function(_with, localModel, that){
        var _this = that;
        
        switch(config.adapter){
            case 'sequelize':
                if(typeof _with !== 'undefined' && _with !== null)
                    try{
                        _with.forEach(function(rel){
                            var a = rel.split('.'), c=0;
                            a.forEach(function(r){
                                var relModel = localModel._ormModel[r];

                                localModel[r] = (function(){
                                    var w = typeof a[c+1]!=='undefined' ? a[c+1]:null;
                                    return _this.getLocalModelFromORM(relModel, lib.core.models[r], w)
                                })()
                                c++;
                            });
                        })
                    }catch(e){
                        console.trace(e)
                    }
                break;
        }
    }
        
    return {
        /**
         * The initialization will instantiate the ORM, by providing database parameters 
         * and doing the appropiate startup sequence for the chosen ORM module.
         * This method must be run before any other method in this module.
         * 
         * @method  initialize
         */
        initialize : function(){
            if(!config.adapter)
                config.adapter = 'sequelize';

            switch(config.adapter){
                // initialize sequelize.
                case 'sequelize':
                    _adapter = config.adapter;
                    _instance = new seq(config.database, config.username, config.password, {
                        dialect: config.driver,
                        port:config.port,
                        omitNull:true,
                        define: {
                            underscored: true,
                            freezeTableName: false,
                            charset: 'utf8',
                            collate: 'utf8_general_ci',
                            timestamps: false,
                            instanceMethods:{},
                            classMethods:{}
                        }
                    });
                    return _instance;
                    break;
            }
    
            return null;
        },
        /**
         * Get new ORM model's instance.
         * This method will return a new instance of the given model in its ORM's specific format, 
         * by using the appropiate method defined by the chosen ORM module.
         * 
         * @param   {String}    Name of model to import.
         * @method loadORMModel
         * @return  {Object}    ORM model.
         */
        loadORMModel : function(modelName){
            if(!config.adapter && typeof _instance !== 'object')
                console.trace('db adapter not properly set.');
            
            var model = null;
            
            try{
                switch(config.adapter){
                    case 'sequelize':
                        // get model definition
                        var local = require(path.resolve(__dirname+'/../../src/models/'+modelName));
                        var modelName = local.model && local.model.name !== 'undefined' ? local.model.name : modelName;
                        
                        var ormFields = {}, ormMethods = {
                            instanceMethods:{},
                            classMethods:{}
                        };
                        
                        // convert to sequelize model
                        if(local.model && typeof local.model.fields !== 'undefined'){
                            local.model.fields.forEach(function(f){
                                // set sequelize type
                                var ormType = seq[f.type.toUpperCase()];
                                
                                ormFields[f.name] = {
                                    allowNull : !f.required,
                                    primaryKey : typeof f.primary !== 'undefined'?f.primary:false,
                                    type : ormType
                                }
                                // copy min/max values
                                if(typeof f.max!== 'undefined')
                                    ormFields[f.name].max = f.max
                                if(typeof f.min!== 'undefined')
                                    ormFields[f.name].min = f.min
                            });
                            
                            // set user defined methods
                            if(local.model && typeof local.model.methods !== 'undefined'){
                                Object.keys(local.model.methods).forEach(function(m){
                                    if(/^\$.*$/g.test(m)){
                                        ormMethods.instanceMethods[m] = local.model.methods[m];
                                    }else{
                                        ormMethods.classMethods[m] = local.model.methods[m];
                                    }
                                });
                            }
                            
                            model = _instance.define(modelName, ormFields, ormMethods);
                        }
                        
                        // define custom attributes
                        model._customFields = {};
                        Object.keys(local.model).forEach(function(a){
                            if(!(/^(?:fields|relations|methods)$/g.test(a))){
                                model._customFields[a] = local.model[a];
                            }
                        });
                            
                        // copy relationships from local to orm model
                        model._customRelationships = {};
                        if(local.model && typeof local.model.relations !== 'undefined'){
                            Object.keys(local.model.relations).forEach(function(rel){
                                model._customRelationships[rel] = local.model.relations[rel];
                            });
                        }
                            
                        return model;
                        break;
                }
            }catch(e){
                console.trace(e)
            }
            
            return model;
        },
        /**
         * This will convert the provided ORM model's instance into a  
         * baseModel instance.
         * 
         * @param   {Object}    ORM. ORM's specific model instance.
         * @param   {Object}    Base. model's instance.
         * @param   {Array}     With. Names of associated models to be attached to the 
         *                      returning model.
         * @param   {Array}     Internal usage. Only return selected fields.
         * @method getLocalModelFromORM
         * @return  {Object}    This framework's compatible model.
         */
        getLocalModelFromORM : function(ormModel, baseModel, _with, _fields){
            // convert to base model
            var base = typeof baseModel !== 'undefined' ? baseModel :require(path.resolve(__dirname+'/../models/baseModel'))(ormModel);
            var model = base;
            var modelName = null;

            // merge own instance with user methods and settings defined in ORM model.
            switch(config.adapter){
                case 'sequelize':
                    var opts = ormModel.options ? ormModel.options : ormModel.__options;
                    model = Object.merge(base, opts.instanceMethods);
                    model = Object.merge(model, opts.classMethods);
                    modelName = typeof baseModel !== 'undefined' ? baseModel.$$name : ormModel.name;
                    break;
            }
            
            // if this is an instance of a local model, then delete top class methods/properties
            if(typeof baseModel !== 'undefined'){
                Object.keys(baseModel).forEach(function(k){
                    if(/^\$(?:find|create)$/g.test(k)){
                        delete model[k]
                    }
                });
            }

            // define getter/setters
            model.$getFields().forEach(function(f){
                if(_fields && _fields!==null){
                    if(_fields.indexOf(f)===-1){
                        delete model[f];
                        return
                    }
                }

                Object.defineProperty(model,f,{
                    get : function(){
                        switch(config.adapter){
                            case 'sequelize':
                                return typeof ormModel[f]=== 'undefined'?null:ormModel[f];
                                break;
                        }
                    },
                    set : function(newV){
                        switch(config.adapter){
                            case 'sequelize':
                                ormModel[f]= newV;
                                break;
                        }
                    },
                    enumerable : true,
                    configurable : true
                });
            });
            
            // set custom fields
            if(typeof ormModel._customFields === 'object'){
                Object.keys(ormModel._customFields).forEach(function(f){
                    if(typeof ormModel._customFields[f] !== 'function' && f!=='name')
                        model['$$'+f] = ormModel._customFields[f];
                });
            }
            
            // set model's name as readonly attribute
            Object.defineProperty(model, '$$name',{
                value: modelName,
                writable: false,
                configurable: false,
                enumerable: true
            });

            // make orm available (for internal purposes only)
            Object.defineProperty(model, '_ormModel',{
                value: ormModel,
                writable: true,
                configurable: false,
                enumerable: false
            });
            
            // if baseModel is a live instance, make relations available to final model
            if(typeof baseModel !=='undefined' && typeof _with !== 'undefined' && _with !== null){
                if(_with instanceof Array)
                    _defineRelationsGettersAndSetters(_with, model, this);
            }
            
            return model;
        },
        /**
         * @param   {Object}    Optional ORM model to be refreshed.
         * @param   {Boolean}   Only return and do not refresh lib.core.models
         * @method  setupRelationships
         */
        setupRelationships : function(forORMModel, ret){
            if(typeof lib.core.ormModels !== 'undefined'){
                for(var modelName in lib.core.ormModels){
                    var ormModel = lib.core.ormModels[modelName];
                    
                    if(typeof forORMModel !== 'undefined' && forORMModel.name !== modelName){
                        continue
                    }else if(typeof forORMModel !== 'undefined' && forORMModel.name === modelName){
                        return ormModel
                    }
           
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
                    var model = this.getLocalModelFromORM(ormModel);
                    
                    if(ret)
                        return model
                    
                    lib.core.models[ormModel.name] = model;
                }
            }
        }
    }
}