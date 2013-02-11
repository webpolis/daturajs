function userController($scope, $resource, $window){
    $scope.user = {}, $scope.client = {}, $scope.states = [];
    $scope.loginFailed = false;
    $scope._res = $resource('http://'+$window.location.hostname+'\\::port/:parent/:controller/:action',{
        },{
            login:{
                method:'POST',
                params:{
                    controller:'auth',
                    action:'login',
                    port:$window.location.port
                }
            },
            register:{
                method:'PUT',
                params:{
                    parent:'rest',
                    controller:'user',
                    action:'register',
                    port:3339
                }
            },
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
    $scope.getStates = function(){
        $scope._res.getStates($scope.user,function(ret){
            if(ret && ret.states){
                $scope.states = ret.states
            }
        },function(err){
            throw err
        });
    },
    $scope.login = function(){
        $scope._res.login($scope.user,function(ret){
            if(ret){
                $scope.loginFailed = false;
                $window.location = '/';
            }
        },function(err){
            $scope.loginFailed = true;
        });
    },
    $scope.register = function(){
        $scope._res.register({
            user:$scope.user,
            client:$scope.client
        },function(user){
            $scope.login();
        });
    }
}

userController.$inject = ['$scope', '$resource', '$window'];