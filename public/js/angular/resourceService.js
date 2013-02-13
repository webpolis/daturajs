var charter = charter || {};

charter.factory('resourceService', function($resource, $window) {
    return function(){
        var res = $resource('http://'+$window.location.hostname+'\\::port/:parent/:controller/:action/:extra1/:extra2/:extra3',{
            },{
                // user related
                userLogin:{
                    method:'POST',
                    params:{
                        controller:'auth',
                        action:'login',
                        port:$window.location.port
                    }
                },
                userRegister:{
                    method:'POST',
                    params:{
                        parent:'rest',
                        controller:'user',
                        action:'register',
                        port:3339
                    }
                },
                userUpdate:{
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
                // department related
                getDepartments:{
                    method:'GET',
                    params:{
                        parent:'rest',
                        controller:'department',
                        action:'getDepartments',
                        port:3339
                    }
                },
                departmentSave:{
                    method:'POST',
                    params:{
                        parent:'rest',
                        controller:'department',
                        action:'departmentSave',
                        port:3339
                    }
                },
                // accounting system related
                getAccountingSystemTypes:{
                    method:'GET',
                    params:{
                        parent:'rest',
                        controller:'accountingSystemType',
                        action:'getAccountingSystemTypes',
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