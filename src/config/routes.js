exports.main = [
    /**
     * www actions
     */
    {
        url: ['/','/home'],
        action: 'static/home', // format is path:controller_no_suffix/action
        method:'get'
    },
    // user related
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
        url: ['/user/settings','/user/settings/:section'],
        action: 'user/settings',
        method:'get'
    },
    // department related
    {
        url: '/department/list',
        action: 'department/list',
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
    // department related
    {
        url: ['/rest/department/getDepartments/:clientId'],
        action: 'department/getDepartments',
        method:'get',
        isRest:true
    },
    // accounting system related
    {
        url: '/rest/accountingSystemType/getAccountingSystemTypes',
        action: 'accountingSystemType/getAccountingSystemTypes',
        method:'get',
        isRest:true
    },
    // location related
    {
        url: '/rest/location/getStates',
        action: 'location/getStates',
        method:'get',
        isRest:true
    },
    ]