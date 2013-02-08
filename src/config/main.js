/**
 * Main application's configuration file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
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
        model : 'user'
    }
}

exports.main = _dev || _prod || null;
