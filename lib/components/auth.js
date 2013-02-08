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
 * @param   data    username and password fields
 * @return  boolean Whether authentication succeed or not.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main')).main.auth
,db = require(path.resolve(__dirname+'/../adapters/db'));

module.exports = function(){
    return{
        /**
         * Listen to login/logout requests and provide custom authentication mechanism.
         * 
         * @param   req
         * @param   res
         * @param   nxt
         */
        initialize: function(req, res, nxt){
            // listen for login requests
            if(req.originalUrl === config.loginUrl){
                var user = req.body;
                
                if(typeof config.model!=='undefined'){
                    // instantiate model
                    var model = new db().loadModel(config.model.toLowerCase().trim());
                    var auth = model.options.classMethods.auth(user);
                    
                    if(auth){
                        var now = new Date();
                        var expireDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
                        
                        delete user.password;
                        res.cookie('auth',user, {
                            expires: expireDate
                        });

                        res.send(200, auth);
                    }else{
                        res.send(401, auth);
                    }
                    return;
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