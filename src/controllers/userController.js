module.exports = function(){
    var userController = {
        login : function (req,res){
            this.$$.app.set('title','Login');
            this.$$.render('login');
        },
        register : function (req,res){
            this.$$.app.set('title','Register');

            var state = this.$$.models.state;
            var user = this.$$.models.user;
            var client = this.$$.models.client;
            
            _$$ = this.$$;
            state.$find('all',{
                'with':['country'],
                'order':'state_name ASC'
            }, function(states){
                _$$.render('register',{
                    states: states,
                    user: user,
                    client: client
                });
            });
        }
    };
    
    return userController;
}