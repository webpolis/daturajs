function documentController($scope, $window, resourceService, gridService){
    $scope.documents = [], $scope.document = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('documents','documentColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.document = sel;
        $('#documentForm').modal('show')
    }

    $scope.list = function(){
        resourceService('document').list({
        },function(ret){
            if(ret.documents)
                $scope.documents = ret.documents
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('document').save({
            document : $scope.document
        },function(ret){
            if(ret.document){
                $scope.document = ret.document
                $scope.list()
                $('#documentForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('document').remove({
            document : $scope.document
        },function(ret){
            if(ret){
                $scope.list()
                $('#documentForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

documentController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];