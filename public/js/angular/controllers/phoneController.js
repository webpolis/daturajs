function phoneController($scope, $window, resourceService, gridService){
    $scope.phones = [], $scope.phone = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('phones','phoneColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.phone = sel;
        $('#phoneForm').modal('show')
    }

    $scope.list = function(){
        resourceService('phone').list({
        },function(ret){
            if(ret.phones)
                $scope.phones = ret.phones
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('phone').save({
            phone : $scope.phone
        },function(ret){
            if(ret.phone){
                $scope.phone = ret.phone
                $scope.list()
                $('#phoneForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('phone').remove({
            phone : $scope.phone
        },function(ret){
            if(ret){
                $scope.list()
                $('#phoneForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

phoneController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];