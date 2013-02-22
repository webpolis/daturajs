function contactController($scope, $window, resourceService, gridService){
    $scope.contacts = [], $scope.contact = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('contacts','contactColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.contact = sel;
        $('#contactForm').modal('show')
    }

    $scope.list = function(){
        resourceService('contact').list({
        },function(ret){
            if(ret.contacts)
                $scope.contacts = ret.contacts
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('contact').save({
            contact : $scope.contact
        },function(ret){
            if(ret.contact){
                $scope.contact = ret.contact
                $scope.list()
                $('#contactForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('contact').remove({
            contact : $scope.contact
        },function(ret){
            if(ret){
                $scope.list()
                $('#contactForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

contactController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];