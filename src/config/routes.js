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
    {
        url: '/user/settings',
        action: 'user/settings',
        method:'get'
    },
    /**
     * rest api
     */
    
    // user related
    {
        url: '/rest/user/register',
        action: 'user/register',
        method:'post',
        isRest:true
    },
    {
        url: '/rest/user/update',
        action: 'user/update',
        method:'post',
        isRest:true
    },
    {
        url: '/rest/subscription/getSubscriptions',
        action: 'subscription/getSubscriptions',
        method:'get',
        isRest:true
    },
    {
        url: '/rest/location/getStates',
        action: 'location/getStates',
        method:'get',
        isRest:true
    },
    ]