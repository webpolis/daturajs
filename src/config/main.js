/**
 * Main application's configuration file.
 * 
 * @author  Nicolas Iglesias <nico@webpolis.com.ar> for daturajs - https://github.com/webpolis/daturajs -
 * @date    Fri Feb 22 2013 20:19:10 GMT-0300 (ART)
 */
var _dev = {
    // params are publicly accessible from a controller via this.vars
    params:{
        appName : 'webpolis'
    },

    // secret key, for session id generator
    secretKey:'135819069427988530',
    
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
