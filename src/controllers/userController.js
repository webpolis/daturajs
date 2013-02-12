module.exports = function(){
    var userController = {
        login : function (req,res){
            this.$$.app.set('title','Login');
            this.$$.app.set('code','user.login');
            
            this.$$.render('login',{
                user : this.$$.models.user.getInstance()
            });
        },
        register : function (req,res){
            this.$$.app.set('title','Register');
            this.$$.app.set('code','user.register');

            var user = this.$$.models.user;
            var client = this.$$.models.client;
            
            this.$$.render('register',{
                user: user.getInstance(),
                client: client.getInstance()
            });
        },
        settings : function (req,res){
            var auth = req.signedCookies.auth;
            
            // @todo apply role based permission
            if(typeof auth === 'undefined' || !auth.id){
                res.redirect('/')
                return
            }
                
            this.$$.app.set('title','Settings');
            this.$$.app.set('code','user.settings');
            
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