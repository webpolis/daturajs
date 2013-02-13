var charter = charter || {};

charter.factory('gridService', function($resource, $window) {
    return function($scope){
        return {
            init : function(dataVar, limit, columns){
                var cc = []
                if(typeof columns !== 'undefined'){
                    for(var c in columns){
                        if(typeof columns[c] === typeof {})
                            cc.push({
                                field: columns[c].name,
                                displayName: columns[c].label
                            });
                    }
                }
                
                $scope.pagingOptions = {
                    pageSizes: [25, 50, 100],
                    pageSize: limit ? limit : 25,
                    totalServerItems: 0,
                    currentPage: 1
                },
                $scope.gridOptions = {
                    data: dataVar,
                    enableCellSelection: true,
                    displaySelectionCheckbox:false,
                    enablePaging: true,
                    pagingOptions: $scope.pagingOptions,
                    columnDefs:cc
                };
            
                $scope.$watch('pagingOptions', function () {
                    }, true);
            }
        }
    }
});