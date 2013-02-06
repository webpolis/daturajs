exports.main = [
    /**
     * www actions
     */
    {
        url: ['/','/home'],
        action: 'static/home', // format is path:controller_no_suffix/action
        method:'get'
    },
    {
        url: '/user/login',
        action: 'user/login',
        method:'get'
    },
    {
        url: '/user/register',
        action: 'user/register',
        method:'get'
    },
    /**
     * rest api
     */
    {
        url: '/rest/user/login',
        action: 'user/login',
        method:'put',
        isRest:true // rest controllers will be placed in controllers/rest
    },
    {
        url: '/rest/user/register',
        action: 'user/register',
        method:'put',
        isRest:true
    }
    ]