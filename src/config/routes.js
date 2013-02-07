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
        url: '/user/logout',
        action: 'user/logout',
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
        isRest:true, // rest controllers will be placed in controllers/rest,
        /**
         * This method will map a virtual route with the authentication method, 
         * so there is no need to create a target action or view.
         * Successfull authentication will return http response code 200.
         * Invalid authentication will return http response code 400.
         */
        isAuthLogin:true
    },
    {
        url: '/rest/user/register',
        action: 'user/register',
        method:'put',
        isRest:true
    }
    ]