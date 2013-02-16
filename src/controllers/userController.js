var gridHelper = require('../helpers/grid');

module.exports = function(){
    var userController = {
        login : function (req,res){
            this.app.set('title','Login');
            this.app.set('code','user.login');
            
            this.render('login',{
                user : this.models.user.getInstance()
            });
        },
        register : function (req,res){
            this.app.set('title','Register');
            this.app.set('code','user.register');

            var user = this.models.user;
            var client = this.models.client;
            
            this.render('register',{
                user: user.getInstance(),
                client: client.getInstance()
            });
        },
        settings : function (req,res){
            // @todo apply role based permission
            if(this.auth===null){
                res.redirect('/')
                return
            }
            
            var user = this.models.user;
            var _this = this;
            
            this.app.set('title','Settings');
            this.app.set('code','user.settings');
            
            user.$find('one',{
                conditions:['users.id = :user_id'],
                params:{
                    user_id:this.auth.id
                },
                'with':['client']
            },function(_user){
                delete _user.password;
                
                _this.render('settings',{
                    user: _user,
                    client: _user.client
                });
            });
        },
        index : function (req,res){
            // @todo apply role based permission
            if(this.auth===null){
                res.redirect('/')
                return
            }
            
            // set a new model's instance to be made available to the "Add User"
            var user = this.models.user.getInstance({
                client_id:this.auth.client_id
            })
            
            this.app.set('title','Users');
            this.app.set('code','user.index');
            
            this.render('list',{
                clientId : this.auth.client_id,
                user: user,
                // those that will be visible in the grid
                userColumns : gridHelper.typeMap(user.$getFields(user.getListableColumns()))
            });
        }
    };
    
    return userController;
}