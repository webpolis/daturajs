/**
 * Models initialization file.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var fs = require('fs')
,path = require('path')
,vm = require('vm')
,seq = require('sequelize')
,config = require(path.resolve(__dirname+'/../../src/config/main'))
,lib = require(path.resolve(__dirname+'/../'));

// initialize sequelize.
var sequelize = new seq(config.main.db.database, config.main.db.username, config.main.db.password, {
    dialect: config.main.db.driver,
    port:config.main.db.port,
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

// dynamically build models array for internal usage.
fs.readdir(path.resolve(__dirname+'/../../src/models'),function(err,l){
    l.forEach(function(j){
        j = path.basename(j,'.js');
        if(!/index/i.test(j)){
            try{
                lib.core.models[j]=sequelize.import(path.resolve(__dirname+'/../../src/models/'+j));
            }catch(e){
                console.log('[error] '+e.message);
            }
        } 
    });
});

module.exports = lib.core.models;