function sessionController($scope, $window, resourceService, gridService){
    $scope.sessions = [], $scope.session = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('sessions','sessionColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.session = sel;
        $('#sessionForm').modal('show')
    }

    $scope.list = function(){
        resourceService('session').list({
        },function(ret){
            if(ret.sessions)
                $scope.sessions = ret.sessions
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('session').save({
            session : $scope.session
        },function(ret){
            if(ret.session){
                $scope.session = ret.session
                $scope.list()
                $('#sessionForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('session').remove({
            session : $scope.session
        },function(ret){
            if(ret){
                $scope.list()
                $('#sessionForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

sessionController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];