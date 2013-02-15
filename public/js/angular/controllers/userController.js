function userController($scope, $window, resourceService, gridService){
    $scope.user = {}, $scope.users = [], $scope.client = {}, $scope.states = [], $scope.userRoles = [], $scope.subscriptions = []
    ,$scope.accountingSystemTypes = [];

    // update client when user is updated
    $scope.$watch('user', function(_user, _oldUsr) {
        if(_user !== null && _user.client)
            $scope.client = _user.client;
    });
    
    $scope.loginFailed = false;
    $scope.settingsFailed = false;
    $scope.settingsSaved = false;
    $scope.accountingServerFail = false;
    $scope.accountingServerOk = false;

    $scope.init = function(){
        $scope.getStates();
        $scope.getUsers();
        $scope.getUserRoles();
        gridService($scope).init('users','userColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.user = sel;
        $('#userForm').modal('show')
    }

    $scope.getStates = function(){
        resourceService('location').getStates(null,function(ret){
            if(ret && ret.states){
                $scope.states = ret.states
            }
        },function(err){
            throw err
        });
    }
    
    $scope.getUserRoles = function(){
        resourceService('user').getUserRoles(null,function(ret){
            if(ret && ret.userRoles){
                $scope.userRoles = ret.userRoles
            }
        },function(err){
            throw err
        });
    }
    
    $scope.getUsers = function(){
        resourceService('user').getUsers({
            extra1:$scope.clientId
        },function(ret){
            if(ret.users)
                $scope.users = ret.users
        },function(err){
            throw err
        })
    }
    
    $scope.getSubscriptions = function(){
        resourceService('user').getSubscriptions(null,function(ret){
            if(ret && ret.subscriptions){
                $scope.subscriptions = ret.subscriptions
            }
        },function(err){
            throw err
        });
    },
    $scope.login = function(){
        resourceService('user').userLogin($scope.user,function(ret){
            if(ret){
                $scope.loginFailed = false;
                $window.location = '/';
            }
        },function(err){
            $scope.loginFailed = true;
        });
    }
    
    $scope.register = function(){
        resourceService('user').userRegister({
            user:$scope.user,
            client:$scope.client
        },function(user){
            $scope.login();
        });
    }
    
    $scope.updateSettings = function(){
        resourceService('user').updateSettings({
            user:$scope.user
        },function(ret){
            $scope.settingsSaved = ret.success === true;
            $scope.settingsFailed = !ret.success;
        });
    }
    
    $scope.userSave = function(){
        $scope.user.client_id = $scope.clientId;

        resourceService('user').userSave({
            user: $scope.user
        },function(ret){
            if(ret.user){
                $scope.user = ret.user
                $scope.getUsers()
                $('#userForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
}

userController.$inject = ['$scope', '$window', 'resourceService','gridService'];