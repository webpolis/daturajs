function vendorController($scope, $window, resourceService, gridService){
    $scope.clientId = null, $scope.vendors = [], $scope.states = [], $scope.vendor = {};
    
    $scope.init = function(){
        $scope.getStates();
        $scope.getVendors();
        gridService($scope).init('vendors','vendorColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.vendor = sel;
        $('#vendorForm').modal('show')
    }

    $scope.getStates = function(){
        resourceService('location').getStates(null,function(ret){
            if(ret && ret.states){
                $scope.states = ret.states
            }
        },function(err){
            throw err
        });
    },

    $scope.getVendors = function(){
        resourceService('vendor').getVendors({
            extra1:$scope.clientId
        },function(ret){
            if(ret.vendors)
                $scope.vendors = ret.vendors
        },function(err){
            throw err
        })
    }
    
    $scope.vendorSave = function(){
        $scope.vendor.client_id = $scope.clientId;

        resourceService('vendor').vendorSave({
            vendor: $scope.vendor
        },function(ret){
            if(ret.vendor){
                $scope.vendor = ret.vendor
                $scope.getVendors()
                $('#vendorForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
}

vendorController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];