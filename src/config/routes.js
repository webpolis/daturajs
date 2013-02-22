exports.main = [
    /**
     * www actions
     */
    {
        url: ['/','/home'],
        action: 'static/home', // format is path:controller_no_suffix/action
        method:'get'
    },
    
    
    // attribute related
    {
        url: ['/attribute','/attribute/index'],
        action: '/attribute/index',
        method: 'get'
    },
    
    // city related
    {
        url: ['/city','/city/index'],
        action: '/city/index',
        method: 'get'
    },
    
    // comment related
    {
        url: ['/comment','/comment/index'],
        action: '/comment/index',
        method: 'get'
    },
    
    // commentDocument related
    {
        url: ['/commentDocument','/commentDocument/index'],
        action: '/commentDocument/index',
        method: 'get'
    },
    
    // company related
    {
        url: ['/company','/company/index'],
        action: '/company/index',
        method: 'get'
    },
    
    // contact related
    {
        url: ['/contact','/contact/index'],
        action: '/contact/index',
        method: 'get'
    },
    
    // contactDeal related
    {
        url: ['/contactDeal','/contactDeal/index'],
        action: '/contactDeal/index',
        method: 'get'
    },
    
    // contactProject related
    {
        url: ['/contactProject','/contactProject/index'],
        action: '/contactProject/index',
        method: 'get'
    },
    
    // contactTracker related
    {
        url: ['/contactTracker','/contactTracker/index'],
        action: '/contactTracker/index',
        method: 'get'
    },
    
    // deal related
    {
        url: ['/deal','/deal/index'],
        action: '/deal/index',
        method: 'get'
    },
    
    // document related
    {
        url: ['/document','/document/index'],
        action: '/document/index',
        method: 'get'
    },
    
    // location related
    {
        url: ['/location','/location/index'],
        action: '/location/index',
        method: 'get'
    },
    
    // phone related
    {
        url: ['/phone','/phone/index'],
        action: '/phone/index',
        method: 'get'
    },
    
    // project related
    {
        url: ['/project','/project/index'],
        action: '/project/index',
        method: 'get'
    },
    
    // session related
    {
        url: ['/session','/session/index'],
        action: '/session/index',
        method: 'get'
    },
    
    // state related
    {
        url: ['/state','/state/index'],
        action: '/state/index',
        method: 'get'
    },
    
    // tracker related
    {
        url: ['/tracker','/tracker/index'],
        action: '/tracker/index',
        method: 'get'
    },
    
    // trackerProject related
    {
        url: ['/trackerProject','/trackerProject/index'],
        action: '/trackerProject/index',
        method: 'get'
    },
    
    // user related
    {
        url: ['/user','/user/index'],
        action: '/user/index',
        method: 'get'
    },
    
    // userContact related
    {
        url: ['/userContact','/userContact/index'],
        action: '/userContact/index',
        method: 'get'
    },
    
    // userProject related
    {
        url: ['/userProject','/userProject/index'],
        action: '/userProject/index',
        method: 'get'
    },
    
    
    
    /**
     * rest api
     */
    
    
    // attribute related
    {
        url: '/rest/attribute/list',
        action: 'attribute/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/attribute/save',
        action: 'attribute/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/attribute/remove',
        action: 'attribute/remove',
        method: 'post',
        isRest: true
    },
    
    // city related
    {
        url: '/rest/city/list',
        action: 'city/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/city/save',
        action: 'city/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/city/remove',
        action: 'city/remove',
        method: 'post',
        isRest: true
    },
    
    // comment related
    {
        url: '/rest/comment/list',
        action: 'comment/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/comment/save',
        action: 'comment/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/comment/remove',
        action: 'comment/remove',
        method: 'post',
        isRest: true
    },
    
    // commentDocument related
    {
        url: '/rest/commentDocument/list',
        action: 'commentDocument/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/commentDocument/save',
        action: 'commentDocument/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/commentDocument/remove',
        action: 'commentDocument/remove',
        method: 'post',
        isRest: true
    },
    
    // company related
    {
        url: '/rest/company/list',
        action: 'company/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/company/save',
        action: 'company/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/company/remove',
        action: 'company/remove',
        method: 'post',
        isRest: true
    },
    
    // contact related
    {
        url: '/rest/contact/list',
        action: 'contact/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/contact/save',
        action: 'contact/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/contact/remove',
        action: 'contact/remove',
        method: 'post',
        isRest: true
    },
    
    // contactDeal related
    {
        url: '/rest/contactDeal/list',
        action: 'contactDeal/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/contactDeal/save',
        action: 'contactDeal/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/contactDeal/remove',
        action: 'contactDeal/remove',
        method: 'post',
        isRest: true
    },
    
    // contactProject related
    {
        url: '/rest/contactProject/list',
        action: 'contactProject/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/contactProject/save',
        action: 'contactProject/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/contactProject/remove',
        action: 'contactProject/remove',
        method: 'post',
        isRest: true
    },
    
    // contactTracker related
    {
        url: '/rest/contactTracker/list',
        action: 'contactTracker/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/contactTracker/save',
        action: 'contactTracker/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/contactTracker/remove',
        action: 'contactTracker/remove',
        method: 'post',
        isRest: true
    },
    
    // deal related
    {
        url: '/rest/deal/list',
        action: 'deal/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/deal/save',
        action: 'deal/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/deal/remove',
        action: 'deal/remove',
        method: 'post',
        isRest: true
    },
    
    // document related
    {
        url: '/rest/document/list',
        action: 'document/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/document/save',
        action: 'document/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/document/remove',
        action: 'document/remove',
        method: 'post',
        isRest: true
    },
    
    // location related
    {
        url: '/rest/location/list',
        action: 'location/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/location/save',
        action: 'location/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/location/remove',
        action: 'location/remove',
        method: 'post',
        isRest: true
    },
    
    // phone related
    {
        url: '/rest/phone/list',
        action: 'phone/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/phone/save',
        action: 'phone/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/phone/remove',
        action: 'phone/remove',
        method: 'post',
        isRest: true
    },
    
    // project related
    {
        url: '/rest/project/list',
        action: 'project/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/project/save',
        action: 'project/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/project/remove',
        action: 'project/remove',
        method: 'post',
        isRest: true
    },
    
    // session related
    {
        url: '/rest/session/list',
        action: 'session/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/session/save',
        action: 'session/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/session/remove',
        action: 'session/remove',
        method: 'post',
        isRest: true
    },
    
    // state related
    {
        url: '/rest/state/list',
        action: 'state/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/state/save',
        action: 'state/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/state/remove',
        action: 'state/remove',
        method: 'post',
        isRest: true
    },
    
    // tracker related
    {
        url: '/rest/tracker/list',
        action: 'tracker/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/tracker/save',
        action: 'tracker/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/tracker/remove',
        action: 'tracker/remove',
        method: 'post',
        isRest: true
    },
    
    // trackerProject related
    {
        url: '/rest/trackerProject/list',
        action: 'trackerProject/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/trackerProject/save',
        action: 'trackerProject/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/trackerProject/remove',
        action: 'trackerProject/remove',
        method: 'post',
        isRest: true
    },
    
    // user related
    {
        url: '/rest/user/list',
        action: 'user/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/user/save',
        action: 'user/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/user/remove',
        action: 'user/remove',
        method: 'post',
        isRest: true
    },
    
    // userContact related
    {
        url: '/rest/userContact/list',
        action: 'userContact/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/userContact/save',
        action: 'userContact/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/userContact/remove',
        action: 'userContact/remove',
        method: 'post',
        isRest: true
    },
    
    // userProject related
    {
        url: '/rest/userProject/list',
        action: 'userProject/list',
        method: 'get',
        isRest: true
    },
    {
        url: '/rest/userProject/save',
        action: 'userProject/save',
        method: 'post',
        isRest: true
    },
    {
        url: '/rest/userProject/remove',
        action: 'userProject/remove',
        method: 'post',
        isRest: true
    },
    
    
    
]