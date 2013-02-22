function userProjectController($scope, $window, resourceService, gridService){
    $scope.userprojects = [], $scope.userProject = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('userprojects','userProjectColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.userProject = sel;
        $('#userProjectForm').modal('show')
    }

    $scope.list = function(){
        resourceService('userProject').list({
        },function(ret){
            if(ret.userprojects)
                $scope.userprojects = ret.userprojects
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('userProject').save({
            userProject : $scope.userProject
        },function(ret){
            if(ret.userProject){
                $scope.userProject = ret.userProject
                $scope.list()
                $('#userProjectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('userProject').remove({
            userProject : $scope.userProject
        },function(ret){
            if(ret){
                $scope.list()
                $('#userProjectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

userProjectController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];