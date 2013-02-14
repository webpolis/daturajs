module.exports = function(){
    var userController = {
        register : function (req,res, nxt){
            var _this = this;
            var data = req.body;
            var user = this.$$.models.user;
            var client = this.$$.models.client;
            var role = this.$$.models.user_role;
            
            // @todo get country id by find
            data.user.country_id = data.user.country_id?data.user.country_id:1;
            data.client.country_id = data.client.country_id?data.client.country_id:data.user.country_id;
            // @todo get state id by find
            data.user.state_id = data.user.state_id?data.user.state_id:1;
            data.client.state_id = data.client.state_id?data.client.state_id:data.user.state_id;
            
            client.$create(data.client,function(client){
                // set default role 'Administrator'
                role.$find('one',{
                    conditions:["user_role_name LIKE ':roleName'"],
                    params:{
                        roleName:'Administrator'
                    }
                },function(_role){
                    if(_role.id){
                        data.user.user_role_id = _role.id;
                        data.user.client_id = client.id;
                        
                        user.$create(data.user,function(user){
                            delete user.password;
                            _this.$$.send(200,user);
                        });
                    }
                }, function(err){
                    _this.$$.send(400,false)
                });
            });
        },
        update : function (req,res, nxt){
            var _$$ = this.$$;
            var data = req.body;
            
            if(typeof data.user ===  'object'){
                var user = this.$$.models.user.getInstance(data.user)
                var client = this.$$.models.client.getInstance(data.user.client)
                delete data.user.client.id
                
                client.$update(data.user.client, null, function(client){
                    delete data.user.id
                    
                    user.$update(data.user, null, function(user){
                        _$$.send(200, {
                            success:true
                        })
                    },function(err){
                        _$$.send(400, {
                            success:false,
                            err: err
                        })
                    })
                })
            }
        }
    };
    
    return userController;
}