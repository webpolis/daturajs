function userController($scope, $window, resourceService){
    $scope.user = {}, $scope.client = {}, $scope.states = [], $scope.subscriptions = []
    ,$scope.accountingSystemTypes = [];

    // update client when user is updated
    $scope.$watch('user', function(_user, _oldUsr) {
        $scope.client = _user.client;
    });
    
    $scope.loginFailed = false;
    $scope.settingsFailed = false;
    $scope.settingsSaved = false;
    $scope.accountingServerFail = false;
    $scope.accountingServerOk = false;

    $scope.getStates = function(){
        resourceService.getStates(null,function(ret){
            if(ret && ret.states){
                $scope.states = ret.states
            }
        },function(err){
            throw err
        });
    },
    $scope.getAccountingSystemTypes = function(){
        resourceService.getAccountingSystemTypes(null,function(ret){
            if(ret && ret.accountingSystemTypes){
                $scope.accountingSystemTypes = ret.accountingSystemTypes
            }
        },function(err){
            throw err
        });
    },
    $scope.getSubscriptions = function(){
        resourceService.getSubscriptions(null,function(ret){
            if(ret && ret.subscriptions){
                $scope.subscriptions = ret.subscriptions
            }
        },function(err){
            throw err
        });
    },
    $scope.login = function(){
        resourceService.userLogin($scope.user,function(ret){
            if(ret){
                $scope.loginFailed = false;
                $window.location = '/';
            }
        },function(err){
            $scope.loginFailed = true;
        });
    },
    $scope.register = function(){
        resourceService.userRegister({
            user:$scope.user,
            client:$scope.client
        },function(user){
            $scope.login();
        });
    },
    $scope.update = function(isExtraSettings){
        resourceService.userUpdate({
            user:$scope.user
        },function(ret){
            if(!isExtraSettings){
                $scope.settingsSaved = ret.success === true;
                $scope.settingsFailed = !ret.success;
            }else{
                $scope.accountingServerFail = !ret.success;
                $scope.accountingServerOk = ret.success === true;
            }
        });
    }
}

userController.$inject = ['$scope', '$window', 'resourceService'];