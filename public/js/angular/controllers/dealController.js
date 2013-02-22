function dealController($scope, $window, resourceService, gridService){
    $scope.deals = [], $scope.deal = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('deals','dealColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.deal = sel;
        $('#dealForm').modal('show')
    }

    $scope.list = function(){
        resourceService('deal').list({
        },function(ret){
            if(ret.deals)
                $scope.deals = ret.deals
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('deal').save({
            deal : $scope.deal
        },function(ret){
            if(ret.deal){
                $scope.deal = ret.deal
                $scope.list()
                $('#dealForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('deal').remove({
            deal : $scope.deal
        },function(ret){
            if(ret){
                $scope.list()
                $('#dealForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

dealController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];