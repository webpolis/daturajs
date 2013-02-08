module.exports = function(){
    var userController = {
        login : function (req,res){
            this.$$.app.set('title','Login');
            this.$$.render('login');
        },
        register : function (req,res){
            this.$$.app.set('title','Register');
            
            var user = this.$$.models['user'];
            var attrs = Object.keys(user.rawAttributes);
            var state = this.$$.models['state'];
            
            _$$ = this.$$;
            state.findAll().success(function(states){
                _$$.render('register',{
                    states: states
                });
            });
        }
    };
    
    return userController;
}