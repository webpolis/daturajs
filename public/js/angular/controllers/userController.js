function userController($scope, $resource, $timeout){
    $scope._data = [];
    $scope._res = $resource('http://localhost\\:3339/rest/user/:action',{
        'action' : '@action'
    },{
        login:{
            method:'PUT'
        }
    });
    
    $scope.login = function(){
        $scope._res.login({
            action:'login'
        },function(ret){
            console.log(ret);
        });
    }
}

userController.$inject = ['$scope', '$resource', '$timeout'];