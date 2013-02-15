function clientController($scope, $window, resourceService, gridService){
    $scope.client = {}, $scope.serverFailMsg = null;
    $scope.settingsFail = false;
    $scope.settingsOk = false;
    $scope.serverFail = false;
    $scope.serverOk = false;

    $scope.getAccountingSystemTypes = function(){
        resourceService('accounting_system_type').getAccountingSystemTypes(null,function(ret){
            if(ret && ret.accountingSystemTypes){
                $scope.accountingSystemTypes = ret.accountingSystemTypes
            }
        },function(err){
            throw err
        });
    }
    
    $scope.updateSettings = function(){
        resourceService('client').updateSettings({
            client:$scope.client
        },function(ret){
            var ok = ret.client && ret.client.id;
            $scope.settingsOk = ok;
            $scope.settingsFail = !ok ? true : false; 
        });
    }
    
    $scope.testServerConnection = function(){
        resourceService('client').testServerConnection({
            client:$scope.client
        },function(ret){
            $scope.serverOk = !ret.err;
            $scope.serverFail = ret.err === false ? false :true;
            $scope.serverFailMsg = ret.err;
        });
    }
}

clientController.$inject = ['$scope', '$window', 'resourceService','gridService'];