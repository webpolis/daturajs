var charter = charter || angular.module('charter',['ngResource','ui']);

/**
 * Translate
 */
charter.filter('t', function() {
    return function(t) {
        return t;
    };
});

charter.filter('toDate', function() {
    return function(t) {
        if(!angular.isDefined(t)){
            return t;
        }
        return new Date(t.replace(/\-/g,'/'));
    };
});

charter.filter('toPercent', function() {
    return function(t) {
        if(!angular.isDefined(t)){
            return t;
        }
        return Math.ceil((t)*100);
    };
});

charter.filter('grepList', function() {
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

charter.directive('ngBlur', function() {
    return function( scope, elem, attrs ) {
        elem.bind('blur', function() {
            scope.$apply(attrs.ngBlur);
        });
    };
});

charter.directive('ngPercent', function() {
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
