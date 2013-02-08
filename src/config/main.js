var _dev = {
    // params are publicly accessible from a controller via this.$$.config.paramName
    params:{
        appName : 'charterAP'
    },
    
    // secret key, for session id generator
    secretKey:'secret',
    
    // db configuration
    db:{
        adapter:'sequelize',
        driver:'postgres',
        host:'localhost',
        username:'resteasy',
        password:'resteasy',
        database:'resteasy',
        port:5432
    },
    // auth component configuration
    auth:{
        loginUrl : '/auth/login',
        logoutUrl : '/auth/logout',
        
        /**
         * The chosen model must implement 'auth' method inside model's classMethods property, 
         * so it should be accessible as modelName.auth().
         * The method must return true when succesful or false if authentication has failed.
         * 
         * 'auth' method's signature is:
         * 
         * @param   data    username and password fields
         * @return  boolean Whether authentication succeed or not.
         */
        model : 'user'
    }
}

exports.main = _dev || _prod || null;
