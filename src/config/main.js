var _dev = {
    // params are publicly accessible from a controller via this.$$.config.paramName
    params:{
        appName : 'Uncommon Project Dev'
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
        port:1433
    }
}

exports.main = _dev || _prod || null;
