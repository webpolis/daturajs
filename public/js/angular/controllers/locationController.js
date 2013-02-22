function locationController($scope, $window, resourceService, gridService){
    $scope.locations = [], $scope.location = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('locations','locationColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.location = sel;
        $('#locationForm').modal('show')
    }

    $scope.list = function(){
        resourceService('location').list({
        },function(ret){
            if(ret.locations)
                $scope.locations = ret.locations
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('location').save({
            location : $scope.location
        },function(ret){
            if(ret.location){
                $scope.location = ret.location
                $scope.list()
                $('#locationForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('location').remove({
            location : $scope.location
        },function(ret){
            if(ret){
                $scope.list()
                $('#locationForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

locationController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];