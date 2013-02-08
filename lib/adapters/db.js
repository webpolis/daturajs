/**
 * Database adapter.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var seq = require('sequelize'),
path = require('path'),
config = require(path.resolve(__dirname+'/../../src/config/main')).main.db
_adapter = null, _instance = null;

module.exports = function(){
    return {
        /**
         * Must be run before any other method in this module.
         */
        initialize : function(){
            if(!config.adapter)
                throw '[error] db adapter not set.';

            switch(config.adapter){
                // initialize sequelize.
                case 'sequelize':
                    _adapter = config.adapter;
                    _instance = new seq(config.database, config.username, config.password, {
                        dialect: config.driver,
                        port:config.port,
                        define: {
                            underscored: true,
                            freezeTableName: false,
                            charset: 'utf8',
                            collate: 'utf8_general_ci',
                            timestamps: true,
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
         * Get new model's instance.
         * 
         * @param   modelName   Name of model to load.
         */
        loadModel : function(modelName){
            if(!config.adapter && typeof _instance !== 'object')
                throw '[error] db adapter not properly set.';
            
            switch(config.adapter){
                case 'sequelize':
                    return _instance.import(path.resolve(__dirname+'/../../src/models/'+modelName));
                    break;
            }
            
            return null;
        }
    }
}