function userContactController($scope, $window, resourceService, gridService){
    $scope.usercontacts = [], $scope.userContact = {};
    
    $scope.init = function(){
        $scope.list();
        gridService($scope).init('usercontacts','userContactColumns', 25, $scope._onSelect);
    }

    $scope._onSelect = function(r,ev){
        var sel = r.entity;
        $scope.userContact = sel;
        $('#userContactForm').modal('show')
    }

    $scope.list = function(){
        resourceService('userContact').list({
        },function(ret){
            if(ret.usercontacts)
                $scope.usercontacts = ret.usercontacts
        },function(err){
            throw err
        })
    }
    
    $scope.save = function(){
        resourceService('userContact').save({
            userContact : $scope.userContact
        },function(ret){
            if(ret.userContact){
                $scope.userContact = ret.userContact
                $scope.list()
                $('#userContactForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    $scope.remove = function(){
        resourceService('userContact').remove({
            userContact : $scope.userContact
        },function(ret){
            if(ret){
                $scope.list()
                $('#userContactForm').modal('hide')
            }
        },function(err){
            throw err
        })
    }
    
    
}

userContactController.$inject = ['$scope', '$window', 'resourceService', 'gridService'];