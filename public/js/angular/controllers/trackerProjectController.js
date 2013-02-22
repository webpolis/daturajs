function trackerProjectController($scope, $window, resourceService, gridService){
    $scope.trackerprojects = [], $scope.trackerProject = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('trackerprojects','trackerProjectColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.trackerProject = sel;
        $('#trackerProjectForm').modal('show')
    }

    $scope.list = function(){
        resourceService('trackerProject').list({
        },function(ret){
            if(ret.trackerprojects)
                $scope.trackerprojects = ret.trackerprojects
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('trackerProject').save({
            trackerProject : $scope.trackerProject
        },function(ret){
            if(ret.trackerProject){
                $scope.trackerProject = ret.trackerProject
                $scope.list()
                $('#trackerProjectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('trackerProject').remove({
            trackerProject : $scope.trackerProject
        },function(ret){
            if(ret){
                $scope.list()
                $('#trackerProjectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

trackerProjectController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];