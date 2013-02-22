var bootstrap = bootstrap || angular.module('bootstrap',['ngResource','ui', 'ngGrid']);

bootstrap.filter('toDate', function() {
    return function(t) {
        if(!angular.isDefined(t)){
            return t;
        }
        return new Date(t.replace(/\-/g,'/'));
    };
});

bootstrap.filter('toPercent', function() {
    return function(t) {
        if(!angular.isDefined(t)){
            return t;
        }
        return Math.ceil((t)*100);
    };
});

bootstrap.filter('grepList', function() {
    return function(t, o,k, v) {
        if(t!== null && angular.isDefined(o)){
            for(i in o){
                if(!angular.isDefined(t)){
                    return t;
                }
                if(!angular.isNumber(t) && t.match(/\d+/g) && angular.isNumber(o[i][v])){
                    t = parseInt(t);
                }
                if(t===o[i][v]){
                    return o[i][k];
                }
            }
        }
        return t;
    };
});

bootstrap.directive('ngBlur', function() {
    return function( scope, elem, attrs ) {
        elem.bind('blur', function() {
            scope.$apply(attrs.ngBlur);
        });
    };
});

bootstrap.directive('ngConfirm', function($window) {
    return function( scope, elem, attrs ) {
        elem.bind('click', function() {
            return $window.confirm(attrs['ngConfirm']);
        });
    };
});

bootstrap.directive('ngPercent', function() {
    return {
        restrict: 'EA',
        replace:false,
        transclude:true,
        template:'<div class="ng-percent"></div>',
        link:function(scope, el,attr){
            var v = Math.ceil(scope.$eval(attr.ngModel)*100);
            v = !v ? 0 : v;
            var b = jQuery('<div />').css({
                height:'15px',
                width:v+'%',
                backgroundColor:'#00ff00'
            });
            el.find('.ng-percent').css({
                width:'100%',
                border:'1px solid #ccc'
            }).append(b);
        }
    }
});

bootstrap.directive('grid', function() {
    return {
        restrict: 'EA',
        replace:false,
        transclude:true,
        template:'<div class="grid span12 clear" ng-grid="gridOptions"></div>',
        link:function(scope, el,attr){
            if(attr.gridClass)
                el.addClass(attr.gridClass)
        }
    }
});