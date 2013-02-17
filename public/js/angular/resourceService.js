var charter = charter || {};

// @todo get variables from server
const REST_PORT = 8081;

charter.factory('resourceService', function($resource, $window) {
    /**
     * Setup your resources parameters.
     * 
     * @property    _resourceParams
     * @type    {Object}
     * @private
     */
    var _resourcesParams = {
        'user' :{
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
                    port:REST_PORT
                }
            },
            updateSettings:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'updateSettings',
                    port:REST_PORT
                }
            },
            getUsers:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'getUsers',
                    port:REST_PORT
                }
            },
            userSave:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'userSave',
                    port:REST_PORT
                }
            },
            getUserRoles:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'getUserRoles',
                    port:REST_PORT
                }
            },
            getSubscriptions:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'subscription',
                    action:'getSubscriptions',
                    port:REST_PORT
                }
            }
        },
        'client' : {
            // client related
            updateSettings:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'client',
                    action:'updateSettings',
                    port:REST_PORT
                }
            },
            testServerConnection:{
                method:'POST',
                params:{
                    controller:'client',
                    action:'testServerConnection',
                    port:$window.location.port
                }
            }
        },
        'department':{
            // department related
            getDepartments:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'department',
                    action:'getDepartments',
                    port:REST_PORT
                }
            },
            departmentSave:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'department',
                    action:'departmentSave',
                    port:REST_PORT
                }
            }
        },
        'vendor':{
            // vendor related
            getVendors:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'vendor',
                    action:'getVendors',
                    port:REST_PORT
                }
            },
            vendorSave:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'vendor',
                    action:'vendorSave',
                    port:REST_PORT
                }
            }
        },
        'accounting_system_type':{
            // accounting system type related
            getAccountingSystemTypes:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'accountingSystemType',
                    action:'getAccountingSystemTypes',
                    port:REST_PORT
                }
            }
        },
        'location':{
            // location related
            getStates:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'location',
                    action:'getStates',
                    port:REST_PORT
                }
            }
        }
    }
    
    return function(modelName){
        var res = $resource('http://'+$window.location.hostname+'\\::port/:parent/:controller/:action/:extra1/:extra2/:extra3',{
            },_resourcesParams[modelName]);
            
        return res;
    }
});