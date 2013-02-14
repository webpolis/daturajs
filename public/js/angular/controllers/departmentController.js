function departmentController($scope, $window, resourceService, gridService){
    $scope.clientId = null, $scope.departments = [], $scope.department = {};
    
    $scope.init = function(){
        $scope.getDepartments();
        gridService($scope).init('departments','departmentColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.department = sel;
        $('#departmentForm').modal('show')
    }

    $scope.getDepartments = function(){
        resourceService.getDepartments({
            extra1:$scope.clientId
        },function(ret){
            if(ret.departments)
                $scope.departments = ret.departments
        },function(err){
            throw err
        })
    }
    
    $scope.departmentSave = function(){
        $scope.department.client_id = $scope.clientId;

        resourceService.departmentSave({
            department: $scope.department
        },function(ret){
            if(ret.department){
                $scope.department = ret.department
                $scope.getDepartments()
                $('#departmentForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
}

departmentController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];