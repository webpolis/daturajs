function contactDealController($scope, $window, resourceService, gridService){
    $scope.contactdeals = [], $scope.contactDeal = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('contactdeals','contactDealColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.contactDeal = sel;
        $('#contactDealForm').modal('show')
    }

    $scope.list = function(){
        resourceService('contactDeal').list({
        },function(ret){
            if(ret.contactdeals)
                $scope.contactdeals = ret.contactdeals
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('contactDeal').save({
            contactDeal : $scope.contactDeal
        },function(ret){
            if(ret.contactDeal){
                $scope.contactDeal = ret.contactDeal
                $scope.list()
                $('#contactDealForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('contactDeal').remove({
            contactDeal : $scope.contactDeal
        },function(ret){
            if(ret){
                $scope.list()
                $('#contactDealForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

contactDealController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];