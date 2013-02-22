/**
 * Main application's configuration file.
 * 
 * @author  Nicolas Iglesias <nico@webpolis.com.ar> for daturajs - https://github.com/webpolis/daturajs -
 * @date    Fri Feb 22 2013 19:40:17 GMT-0300 (ART)
 */
var _dev = {
    // params are publicly accessible from a controller via this.vars
    params:{
        appName : 'test'
    },

    // secret key, for session id generator
    secretKey:'49736829157755380',
    
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
