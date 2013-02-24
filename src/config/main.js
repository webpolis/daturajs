/**
 * Main application's configuration file.
 * 
 * @author  Nicolas Iglesias <nico@webpolis.com.ar> for daturajs - https://github.com/webpolis/daturajs -
 * @date    Sat Feb 23 2013 21:33:00 GMT-0300 (ART)
 */
var _dev = {
    // params are publicly accessible from a controller via this.vars
    params:{
        appName : 'webpolis'
    },

    // secret key, for session id generator
    secretKey:'35097298078320900',
    
    // db configuration
    db:{
        driver:'mysql',
        host:'localhost',
        username:'tracker',
        password:'tracker',
        database:'tracker',
        port:'/var/run/mysqld/mysqld.sock' // unix socket or port number
    },
    
    // auth component configuration
    auth:{
        loginUrl : '/auth/login',
        logoutUrl : '/auth/logout',
        model : 'user'
    }
    
}

exports.main = _dev || _prod || null;
