function departmentController($scope, $window, resourceService){
    $scope.clientId = null, $scope.departments = [];
    $scope.gridOptions = {
        data: 'departments',
        jqueryUITheme: true,
        enableCellSelection: true,
        displaySelectionCheckbox:false,
        enablePaging: true,
        pagingOptions:{
            pageSizes: [25, 50, 100],
            pageSize: 25,
            totalServerItems: 0,
            currentPage: 1
        },
        columnDefs:[
            {
                field:'id',
                displayName:'ID',
                maxWidth:50
            },
            {
                field:'department_name',
                displayName:'Name'
            },
            {
                field:'dept_auth_limit',
                displayName:'Authorization Limit'
            },
            {
                field:'is_auth_required',
                displayName:'Additional Authorization Required'
            }
        ]
    };

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
}

departmentController.$inject = ['$scope', '$window', 'resourceService'];