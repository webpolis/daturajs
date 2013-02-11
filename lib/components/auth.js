/**
 * Basic authentication mechanism.
 * 
 * The Auth Component currently does basically a few things:
 * 
 * When initialized, it will lookup at the settings - src/config/main.js - and will 
 * listen to any request made to the selected login route - config.loginUrl -.
 * Afterwards, will instantiate the selected model - config.model - and will use 
 * model's 'auth' method to execute custom authentication logic (db lookup, etc).
 * Internally, a cookie is generated - named 'auth' - containing basic user information.
 * 
 * The configuration parameters are as follow:
 * 
 * loginUrl     - URL receiving POST fields for user information (username, password).
 * @todo logoutUrl    - URL that will clear cookies and redirect the user.
 * 
 * The chosen model must implement 'auth' method inside model's classMethods property (when using Sequelize as the ORM), 
 * so it should be accessible as modelName.auth().
 * The method must return true when succesful or false if authentication has failed.
 * 
 * 'auth' method's signature is:
 * 
 * @param   {Object}    username and password fields, or custom object.
 * @param   {Function}  Callback function to be executed when done. You should pass 
 *                      your user/custom object as the argument, which will be set 
 *                      as the 'auth' cookie. An optional 2nd argument is an array of 
 *                      fields that will be available in the cookie; otherwise, all fields 
 *                      are going to be saved in the 'auth' cookie (BEWARE! not to show passwords).
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 * @module  auth
 */
var path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main')).main.auth
,db = require(path.resolve(__dirname+'/../adapters/db'));

/**
 * @class auth
 */
module.exports = function(){
    return{
        /**
         * Listen to login/logout requests and provide custom authentication mechanism.
         * 
         * @param   {Object}    Request.
         * @param   {Object}    Response.
         * @param   {Function}  Continue expressjs initialization.
         * @method  initialize
         */
        initialize: function(req, res, nxt){
            // listen for login requests
            if(req.originalUrl === config.loginUrl){
                var user = req.body;
                
                if(typeof config.model!=='undefined'){
                    // instantiate model
                    var ormModel = new db().loadORMModel(config.model.toLowerCase().trim());

                    db().getLocalModelFromORM(ormModel).auth(user,function(user, fields){
                        if(!(user instanceof Array)){
                            var now = new Date();
                            var expireDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

                            // only keep allowed fields
                            if(typeof fields !== 'undefined' && fields.length>0){
                                Object.keys(user).forEach(function(k){
                                    if(fields.indexOf(k)===-1)
                                        delete user[k]
                                })
                            }
                            res.cookie('auth',user, {
                                expires: expireDate,
                                signed: true
                            });

                            res.send(200, true);
                        }else{
                            res.send(401, false);
                        }
                    });
                    return
                }
            }
            
            if(req.originalUrl === config.logoutUrl){
                res.clearCookie('auth');
                res.redirect('/');
                return;
            }
            
            nxt();
        }
    }
}