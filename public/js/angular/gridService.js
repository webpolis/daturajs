var charter = charter || {};

charter.factory('gridService', function() {
    return function($scope){
        return {
            init : function(dataVar, colsVar, limit, selCbk){
                var cc = []
                if(typeof $scope[colsVar] !== 'undefined'){
                    for(var c in $scope[colsVar]){
                        if(typeof $scope[colsVar][c] === typeof {})
                            cc.push({
                                field: $scope[colsVar][c].name,
                                displayName: $scope[colsVar][c].label
                            });
                    }
                }
                $scope.pagingOptions = {
                    pageSizes: [25, 50, 100],
                    pageSize: limit ? parseInt(limit) : 25,
                    totalServerItems: 0,
                    currentPage: 1
                };

                $scope.gridOptions = {
                    data: dataVar,
                    enableCellSelection: true,
                    displaySelectionCheckbox:false,
                    enablePaging: true,
                    pagingOptions: $scope.pagingOptions,
                    columnDefs:cc,
                    afterSelectionChange:selCbk?selCbk:function(){}
                };
                
                $scope.$watch('pagingOptions', function () {
                    }, true);
            }
        }
    }
});