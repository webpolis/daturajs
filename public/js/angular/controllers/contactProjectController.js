function contactProjectController($scope, $window, resourceService, gridService){
    $scope.contactprojects = [], $scope.contactProject = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('contactprojects','contactProjectColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.contactProject = sel;
        $('#contactProjectForm').modal('show')
    }

    $scope.list = function(){
        resourceService('contactProject').list({
        },function(ret){
            if(ret.contactprojects)
                $scope.contactprojects = ret.contactprojects
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('contactProject').save({
            contactProject : $scope.contactProject
        },function(ret){
            if(ret.contactProject){
                $scope.contactProject = ret.contactProject
                $scope.list()
                $('#contactProjectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('contactProject').remove({
            contactProject : $scope.contactProject
        },function(ret){
            if(ret){
                $scope.list()
                $('#contactProjectForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

contactProjectController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];