function contactTrackerController($scope, $window, resourceService, gridService){
    $scope.contacttrackers = [], $scope.contactTracker = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('contacttrackers','contactTrackerColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.contactTracker = sel;
        $('#contactTrackerForm').modal('show')
    }

    $scope.list = function(){
        resourceService('contactTracker').list({
        },function(ret){
            if(ret.contacttrackers)
                $scope.contacttrackers = ret.contacttrackers
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('contactTracker').save({
            contactTracker : $scope.contactTracker
        },function(ret){
            if(ret.contactTracker){
                $scope.contactTracker = ret.contactTracker
                $scope.list()
                $('#contactTrackerForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('contactTracker').remove({
            contactTracker : $scope.contactTracker
        },function(ret){
            if(ret){
                $scope.list()
                $('#contactTrackerForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

contactTrackerController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];