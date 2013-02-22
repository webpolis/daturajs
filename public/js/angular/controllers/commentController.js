function commentController($scope, $window, resourceService, gridService){
    $scope.comments = [], $scope.comment = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('comments','commentColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.comment = sel;
        $('#commentForm').modal('show')
    }

    $scope.list = function(){
        resourceService('comment').list({
        },function(ret){
            if(ret.comments)
                $scope.comments = ret.comments
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('comment').save({
            comment : $scope.comment
        },function(ret){
            if(ret.comment){
                $scope.comment = ret.comment
                $scope.list()
                $('#commentForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('comment').remove({
            comment : $scope.comment
        },function(ret){
            if(ret){
                $scope.list()
                $('#commentForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

commentController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];