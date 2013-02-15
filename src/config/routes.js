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
        url: '/user/settings',
        action: 'user/settings',
        method:'get'
    },   
    {
        url: '/users',
        action: 'user/index',
        method:'get'
    },
    // client related
    {
        url: '/client/settings',
        action: 'client/settings',
        method:'get'
    }, 
    {
        url: '/client/testServerConnection',
        action: 'client/testServerConnection',
        method:'post'
    },  
    // department related
    {
        url: '/departments',
        action: 'department/index',
        method:'get'
    },
    // vendor related
    {
        url: '/vendors',
        action: 'vendor/index',
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
        url: '/rest/user/updateSettings',
        action: 'user/updateSettings',
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
        url: '/rest/user/getUserRoles',
        action: 'user/getUserRoles',
        method:'get',
        isRest:true
    },
    {
        url: ['/rest/user/getUsers/:clientId'],
        action: 'user/getUsers',
        method:'get',
        isRest:true
    },
    {
        url: '/rest/user/userSave',
        action: 'user/userSave',
        method:'post',
        isRest:true
    },
    // client related
    {
        url: '/rest/client/updateSettings',
        action: 'client/updateSettings',
        method:'post',
        isRest:true
    },
    // department related
    {
        url: ['/rest/department/getDepartments/:clientId'],
        action: 'department/getDepartments',
        method:'get',
        isRest:true
    },
    {
        url: '/rest/department/departmentSave',
        action: 'department/departmentSave',
        method:'post',
        isRest:true
    },
    // vendor related
    {
        url: ['/rest/vendor/getVendors/:clientId'],
        action: 'vendor/getVendors',
        method:'get',
        isRest:true
    },
    {
        url: '/rest/vendor/vendorSave',
        action: 'vendor/vendorSave',
        method:'post',
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