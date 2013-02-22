function attributeController($scope, $window, resourceService, gridService){
    $scope.attributes = [], $scope.attribute = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('attributes','attributeColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.attribute = sel;
        $('#attributeForm').modal('show')
    }

    $scope.list = function(){
        resourceService('attribute').list({
        },function(ret){
            if(ret.attributes)
                $scope.attributes = ret.attributes
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('attribute').save({
            attribute : $scope.attribute
        },function(ret){
            if(ret.attribute){
                $scope.attribute = ret.attribute
                $scope.list()
                $('#attributeForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('attribute').remove({
            attribute : $scope.attribute
        },function(ret){
            if(ret){
                $scope.list()
                $('#attributeForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

attributeController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];