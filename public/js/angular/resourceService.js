var charter = charter || {};

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
                    port:3339
                }
            },
            updateSettings:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'updateSettings',
                    port:3339
                }
            },
            getUsers:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'getUsers',
                    port:3339
                }
            },
            userSave:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'userSave',
                    port:3339
                }
            },
            getUserRoles:{
                method:'GET',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'getUserRoles',
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
                    port:3339
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
                    port:3339
                }
            },
            vendorSave:{
                method:'POST',
                params:{
                    parent:'rest',
                    controller:'vendor',
                    action:'vendorSave',
                    port:3339
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
                    port:3339
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
                    port:3339
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