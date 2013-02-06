exports.main = [
    {
        url: ['/','/home'],
        action: 'static/home', // format is path:controller_no_suffix/action
        method:'get'
    },
    {
        url: '/rest/user/login',
        action: 'user/login',
        method:'put',
        isRest:true // rest controllers will be placed in controllers/rest
    },
    {
        url: '/rest/user/register',
        action: 'user/register',
        method:'post',
        isRest:true
    }
    ]