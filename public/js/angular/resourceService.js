var charter = charter || {};

charter.factory('resourceService', function($resource, $window) {
    return function(){
        var res = $resource('http://'+$window.location.hostname+'\\::port/:parent/:controller/:action',{
            },{
                // user related
                login:{
                    method:'POST',
                    params:{
                        controller:'auth',
                        action:'login',
                        port:$window.location.port
                    }
                },
                register:{
                    method:'POST',
                    params:{
                        parent:'rest',
                        controller:'user',
                        action:'register',
                        port:3339
                    }
                },
                update:{
                    method:'POST',
                    params:{
                        parent:'rest',
                        controller:'user',
                        action:'update',
                        port:3339
                    }
                },
                getSubscriptions:{
                    method:'GET',
                    params:{
                        parent:'rest',
                        controller:'subscription',
                        action:'getSubscriptions',
                        port:3339
                    }
                },
                // location related
                getStates:{
                    method:'GET',
                    params:{
                        parent:'rest',
                        controller:'location',
                        action:'getStates',
                        port:3339
                    }
                }
            });
            
        return res;
    }()
});