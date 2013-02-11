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
            data.user.state_id = data.user.state_id?data.user.state_id:data.client.state_id;
            
            client.$create(data.client,function(client){
                data.user.client_id = client.id;
                user.$create(data.user,function(user){
                    delete user.password;
                    _.$$.send(200,user);
                });
            });
        
        }
    };
    
    return userController;
}