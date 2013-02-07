function userController($scope, $resource, $window){
    $scope.user = {};
    $scope._res = $resource('http://'+$window.location.hostname+'\\:3339/rest/user/:action',{
        'action' : '@action'
    },{
        login:{
            method:'PUT',
            params:{
                action:'login'
            }
        },
        register:{
            method:'PUT',
            params:{
                action:'register'
            }
        }
    });
    
    $scope.login = function(){
        $scope._res.login($scope.user,function(ret){
            if(ret.username)
                $window.location = '/';
        });
    },
    $scope.register = function(){
        $scope._res.register($scope.user,function(ret){
            console.log(ret);
        });
    }
}

userController.$inject = ['$scope', '$resource', '$window'];