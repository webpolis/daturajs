function departmentController($scope, $window, resourceService, gridService){
    $scope.clientId = null, $scope.departments = [], $scope.department = {};
    
    // initialize data grid
    var cols = [
    {
        name:'id',
        label:'ID'
    },
    {
        name:'department_name',
        label:'Name'
    },
    {
        name:'dept_auth_limit',
        label:'Authorization Limit'
    },
    {
        name:'is_auth_required',
        label:'Additional Authorization'
    }
    ];
    gridService($scope).init('departments', 25, cols);

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