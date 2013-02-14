/**
 * Several additions and fixes made to the ngGrid module.
 * 
 * @author  Nicolas Iglesias <nicolas@clevertech.biz>
 * @class   gridService
 */
var charter = charter || {};

charter.factory('gridService', function() {
    return function($scope, mapTypes){
        return {
            init : function(dataVar, colsVar, limit, selCbk){
                var cc = []
                if(typeof $scope[colsVar] !== 'undefined'){
                    for(var c in $scope[colsVar]){
                        if(typeof $scope[colsVar][c] === typeof {})
                            cc.push({
                                field: $scope[colsVar][c].name,
                                displayName: $scope[colsVar][c].label,
                                cellTemplate: $scope[colsVar][c].cellTemplate ? 
                                $scope[colsVar][c].cellTemplate : undefined
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
                    multiSelect: false,
                    displaySelectionCheckbox:false,
                    enablePaging: true,
                    pagingOptions: $scope.pagingOptions,
                    columnDefs:cc,
                    afterSelectionChange:selCbk?selCbk:function(){},
                    plugins: [
                    function(opts) {
                        var _this = this;
                        _this.grid = null;
                        _this.scope = null;
                        _this.init = function(scope, grid, services) {
                            _this.grid = grid;
                            _this.scope = scope;
                            
                            // fix for ng-grid when sorting boolean cols
                            Object.defineProperty(Boolean.prototype, 'toLowerCase',{
                                value: this.toString().toLowerCase,
                                writable: false,
                                configurable: false,
                                enumerable: true
                            });
                        };
                        
                        return _this;
                    }
                    ]
                };
                
                // attend pagination events
                $scope.$watch('pagingOptions', function () {
                    
                    }, true);
            }
        }
    }
});