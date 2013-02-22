function commentDocumentController($scope, $window, resourceService, gridService){
    $scope.commentdocuments = [], $scope.commentDocument = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('commentdocuments','commentDocumentColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.commentDocument = sel;
        $('#commentDocumentForm').modal('show')
    }

    $scope.list = function(){
        resourceService('commentDocument').list({
        },function(ret){
            if(ret.commentdocuments)
                $scope.commentdocuments = ret.commentdocuments
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('commentDocument').save({
            commentDocument : $scope.commentDocument
        },function(ret){
            if(ret.commentDocument){
                $scope.commentDocument = ret.commentDocument
                $scope.list()
                $('#commentDocumentForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('commentDocument').remove({
            commentDocument : $scope.commentDocument
        },function(ret){
            if(ret){
                $scope.list()
                $('#commentDocumentForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

commentDocumentController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];