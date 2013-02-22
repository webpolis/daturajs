function stateController($scope, $window, resourceService, gridService){
    $scope.states = [], $scope.state = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('states','stateColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.state = sel;
        $('#stateForm').modal('show')
    }

    $scope.list = function(){
        resourceService('state').list({
        },function(ret){
            if(ret.states)
                $scope.states = ret.states
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('state').save({
            state : $scope.state
        },function(ret){
            if(ret.state){
                $scope.state = ret.state
                $scope.list()
                $('#stateForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('state').remove({
            state : $scope.state
        },function(ret){
            if(ret){
                $scope.list()
                $('#stateForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

stateController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];