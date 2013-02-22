function cityController($scope, $window, resourceService, gridService){
    $scope.cities = [], $scope.city = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('cities','cityColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.city = sel;
        $('#cityForm').modal('show')
    }

    $scope.list = function(){
        resourceService('city').list({
        },function(ret){
            if(ret.cities)
                $scope.cities = ret.cities
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('city').save({
            city : $scope.city
        },function(ret){
            if(ret.city){
                $scope.city = ret.city
                $scope.list()
                $('#cityForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('city').remove({
            city : $scope.city
        },function(ret){
            if(ret){
                $scope.list()
                $('#cityForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

cityController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];