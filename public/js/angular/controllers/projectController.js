function projectController($scope, $window, resourceService, gridService){
    $scope.projects = [], $scope.project = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('projects','projectColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.project = sel;
        $('#projectForm').modal('show')
    }

    $scope.list = function(){
        resourceService('project').list({
        },function(ret){
            if(ret.projects)
                $scope.projects = ret.projects
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('project').save({
            project : $scope.project
        },function(ret){
            if(ret.project){
                $scope.project = ret.project
                $scope.list()
                $('#projectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('project').remove({
            project : $scope.project
        },function(ret){
            if(ret){
                $scope.list()
                $('#projectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

projectController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];