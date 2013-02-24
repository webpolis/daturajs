/**
 * Main application's configuration file.
 * 
 * @author  Nicolas Iglesias <nico@webpolis.com.ar> for daturajs - https://github.com/webpolis/daturajs -
 * @date    Sun Feb 24 2013 19:55:50 GMT-0300 (ART)
 */
var _dev = {
    // params are publicly accessible from a controller via this.vars
    params:{
        appName : 'webpolis'
    },

    // secret key, for session id generator
    secretKey:'57027157199518940',
    
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
