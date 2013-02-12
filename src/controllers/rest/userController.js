module.exports = function(){
    var userController = {
        register : function (req,res, nxt){
            var _ = this;
            var user = this.$$.models.user;
            var client = this.$$.models.client;
            var data = req.body;
            
            // @todo get country id by find
            data.user.country_id = data.user.country_id?data.user.country_id:1;
            data.client.country_id = data.client.country_id?data.client.country_id:data.user.country_id;
            // @todo get state id by find
            data.user.state_id = data.user.state_id?data.user.state_id:1;
            data.client.state_id = data.client.state_id?data.client.state_id:data.user.state_id;
            
            client.$create(data.client,function(client){
                data.user.client_id = client.id;
                user.$create(data.user,function(user){
                    delete user.password;
                    _.$$.send(200,user);
                });
            });
        },
        update : function (req,res, nxt){
            var _$$ = this.$$;
            var data = req.body;
            
            if(typeof data.user ===  'object'){
                var user = this.$$.models.user.getInstance(data.user)
                var client = this.$$.models.client.getInstance(data.user.client)

                client.$update(data.user.client, null, function(client){
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