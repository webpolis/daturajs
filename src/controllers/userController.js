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
            
            this.$$.render('register',{
                user: user,
                client: client
            });
        },
        settings : function (req,res){
            var auth = req.signedCookies.auth;
            
            if(typeof auth === 'undefined' || !auth.id){
                res.redirect('/')
                return
            }
                
            this.$$.app.set('title','Settings');
            var user = this.$$.models.user;
            
            var _$$ = this.$$;
            
            user.$find('one',{
                conditions:['users.id = :user_id'],
                params:{
                    user_id:auth.id
                },
                'with':['client']
            },function(_user){
                delete _user.password;
                
                _$$.render('settings',{
                    user: _user,
                    client: _user.client
                });
            });
        }
    };
    
    return userController;
}