function userController($scope, $window, resourceService, gridService){
    $scope.users = [], $scope.user = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('users','userColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.user = sel;
        $('#userForm').modal('show')
    }

    $scope.list = function(){
        resourceService('user').list({
        },function(ret){
            if(ret.users)
                $scope.users = ret.users
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('user').save({
            user : $scope.user
        },function(ret){
            if(ret.user){
                $scope.user = ret.user
                $scope.list()
                $('#userForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('user').remove({
            user : $scope.user
        },function(ret){
            if(ret){
                $scope.list()
                $('#userForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
    $scope.login = function(){
        resourceService('user').login($scope.user,function(ret){
            if(ret){
                $scope.loginFailed = false;
                $window.location = '/';
            }
        },function(err){
            $scope.loginFailed = true;
        });
    }
    
}

userController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];