function trackerController($scope, $window, resourceService, gridService){
    $scope.trackers = [], $scope.tracker = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('trackers','trackerColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.tracker = sel;
        $('#trackerForm').modal('show')
    }

    $scope.list = function(){
        resourceService('tracker').list({
        },function(ret){
            if(ret.trackers)
                $scope.trackers = ret.trackers
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('tracker').save({
            tracker : $scope.tracker
        },function(ret){
            if(ret.tracker){
                $scope.tracker = ret.tracker
                $scope.list()
                $('#trackerForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('tracker').remove({
            tracker : $scope.tracker
        },function(ret){
            if(ret){
                $scope.list()
                $('#trackerForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

trackerController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];