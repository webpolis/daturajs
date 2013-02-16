/**
 * These are the default configs. Environment specific
 * config files may override or add to this object
 * @type {Object}
 */

module.exports = {





    environment_name: 'Default',

    // params are publicly accessible from a controller via this.vars
    params:{
        appName : 'charterAP'
    },
    
    // secret key, for session id generator
    secretKey:'secret',
    
    // db configuration
    db:{
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

};