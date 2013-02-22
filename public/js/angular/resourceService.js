var bootstrap = bootstrap || {};

// @todo get variables from server
const REST_PORT = 8081;

bootstrap.factory('resourceService', function($resource, $window) {
    /**
     * Setup your resources parameters.
     * 
     * @property    _resourceParams
     * @type    {Object}
     * @private
     */
    var _resourcesParams = {
        
        
        'attribute' : {
            list : {method : 'GET', params : {parent:'rest', controller:'attribute', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'attribute', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'attribute', action:'remove', port:REST_PORT} },
            
        },
        
        'city' : {
            list : {method : 'GET', params : {parent:'rest', controller:'city', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'city', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'city', action:'remove', port:REST_PORT} },
            
        },
        
        'comment' : {
            list : {method : 'GET', params : {parent:'rest', controller:'comment', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'comment', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'comment', action:'remove', port:REST_PORT} },
            
        },
        
        'commentDocument' : {
            list : {method : 'GET', params : {parent:'rest', controller:'commentDocument', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'commentDocument', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'commentDocument', action:'remove', port:REST_PORT} },
            
        },
        
        'company' : {
            list : {method : 'GET', params : {parent:'rest', controller:'company', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'company', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'company', action:'remove', port:REST_PORT} },
            
        },
        
        'contact' : {
            list : {method : 'GET', params : {parent:'rest', controller:'contact', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'contact', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'contact', action:'remove', port:REST_PORT} },
            
        },
        
        'contactDeal' : {
            list : {method : 'GET', params : {parent:'rest', controller:'contactDeal', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'contactDeal', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'contactDeal', action:'remove', port:REST_PORT} },
            
        },
        
        'contactProject' : {
            list : {method : 'GET', params : {parent:'rest', controller:'contactProject', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'contactProject', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'contactProject', action:'remove', port:REST_PORT} },
            
        },
        
        'contactTracker' : {
            list : {method : 'GET', params : {parent:'rest', controller:'contactTracker', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'contactTracker', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'contactTracker', action:'remove', port:REST_PORT} },
            
        },
        
        'deal' : {
            list : {method : 'GET', params : {parent:'rest', controller:'deal', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'deal', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'deal', action:'remove', port:REST_PORT} },
            
        },
        
        'document' : {
            list : {method : 'GET', params : {parent:'rest', controller:'document', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'document', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'document', action:'remove', port:REST_PORT} },
            
        },
        
        'location' : {
            list : {method : 'GET', params : {parent:'rest', controller:'location', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'location', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'location', action:'remove', port:REST_PORT} },
            
        },
        
        'phone' : {
            list : {method : 'GET', params : {parent:'rest', controller:'phone', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'phone', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'phone', action:'remove', port:REST_PORT} },
            
        },
        
        'project' : {
            list : {method : 'GET', params : {parent:'rest', controller:'project', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'project', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'project', action:'remove', port:REST_PORT} },
            
        },
        
        'session' : {
            list : {method : 'GET', params : {parent:'rest', controller:'session', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'session', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'session', action:'remove', port:REST_PORT} },
            
        },
        
        'state' : {
            list : {method : 'GET', params : {parent:'rest', controller:'state', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'state', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'state', action:'remove', port:REST_PORT} },
            
        },
        
        'tracker' : {
            list : {method : 'GET', params : {parent:'rest', controller:'tracker', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'tracker', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'tracker', action:'remove', port:REST_PORT} },
            
        },
        
        'trackerProject' : {
            list : {method : 'GET', params : {parent:'rest', controller:'trackerProject', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'trackerProject', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'trackerProject', action:'remove', port:REST_PORT} },
            
        },
        
        'user' : {
            list : {method : 'GET', params : {parent:'rest', controller:'user', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'user', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'user', action:'remove', port:REST_PORT} },
            
            login : {method:'POST', params : {controller:'auth', action:'login', port:$window.location.port} },
            
        },
        
        'userContact' : {
            list : {method : 'GET', params : {parent:'rest', controller:'userContact', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'userContact', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'userContact', action:'remove', port:REST_PORT} },
            
        },
        
        'userProject' : {
            list : {method : 'GET', params : {parent:'rest', controller:'userProject', action:'list', port:REST_PORT} },
            save : {method : 'POST', params : {parent:'rest', controller:'userProject', action:'save', port:REST_PORT} },
            remove : {method : 'POST', params : {parent:'rest', controller:'userProject', action:'remove', port:REST_PORT} },
            
        },
        
        
    }
    
    return function(modelName){
        var res = $resource('http://'+$window.location.hostname+'\\::port/:parent/:controller/:action/:extra1/:extra2/:extra3',{
            },_resourcesParams[modelName]);
            
        return res;
    }
});