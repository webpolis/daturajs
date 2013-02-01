exports.development = {
    appName : 'Uncommon Project Dev',
    
    // secret key, for session id generator
    secretKey:'secret',
    
    // db configuration
    db:{
        driver:'postgres',
        host:'',
        user:'',
        password:'',
        port:1433
    }
}

exports.production = {
    appName : 'Uncommon Project Dev',
    
    // secret key, for session id generator
    secretKey:'secret',
    
    // db configuration
    db:{
        driver:'postgres',
        host:'',
        user:'',
        password:'',
        port:1433
    }
}

exports.routes = [
{
    url: ['/','/home'],
    action: 'static/home', // format is path:controller_no_suffix/action
    method:'get'
},
{
    url: '/rest/test',
    action: 'test/index',
    method:'get',
    isRest:true // rest controllers will be placed in controllers/rest
}
]