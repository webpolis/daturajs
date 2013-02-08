/**
 * Basic authentication mechanism.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main')).main.auth
,db = require(path.resolve(__dirname+'/../adapters/db'));

module.exports = function(){
    return{
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