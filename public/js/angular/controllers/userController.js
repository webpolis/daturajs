function userController($scope, $window, resourceService){
    $scope.user = {}, $scope.client = {}, $scope.states = [];

    // update client when user is updated
    $scope.$watch('user', function(_user, _oldUsr) {
        $scope.client = _user.client;
    });
    
    $scope.loginFailed = false;

    $scope.getStates = function(){
        resourceService.getStates($scope.user,function(ret){
            if(ret && ret.states){
                $scope.states = ret.states
            }
        },function(err){
            throw err
        });
    },
    $scope.login = function(){
        resourceService.login($scope.user,function(ret){
            if(ret){
                $scope.loginFailed = false;
                $window.location = '/';
            }
        },function(err){
            $scope.loginFailed = true;
        });
    },
    $scope.register = function(){
        resourceService.register({
            user:$scope.user,
            client:$scope.client
        },function(user){
            $scope.login();
        });
    },
    $scope.update = function(){
        resourceService.update({
            user:$scope.user
        },function(user){
            console.log(user)
        });
    }
}

userController.$inject = ['$scope', '$window', 'resourceService'];