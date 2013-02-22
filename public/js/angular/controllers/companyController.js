function companyController($scope, $window, resourceService, gridService){
    $scope.companies = [], $scope.company = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('companies','companyColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.company = sel;
        $('#companyForm').modal('show')
    }

    $scope.list = function(){
        resourceService('company').list({
        },function(ret){
            if(ret.companies)
                $scope.companies = ret.companies
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('company').save({
            company : $scope.company
        },function(ret){
            if(ret.company){
                $scope.company = ret.company
                $scope.list()
                $('#companyForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('company').remove({
            company : $scope.company
        },function(ret){
            if(ret){
                $scope.list()
                $('#companyForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

companyController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];