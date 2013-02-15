var gridHelper = require('../helpers/grid');

module.exports = function(){
    var clientController = {
        settings : function (req,res){
            var auth = req.signedCookies.auth;

            // @todo apply role based permission
            if(typeof auth === 'undefined' || !auth.id){
                res.redirect('/')
                return
            }
                
            this.$$.app.set('title','Settings');
            this.$$.app.set('code','client.settings');
            
            var client = this.$$.models.client;
            
            var _$$ = this.$$;
            
            client.$find('one',{
                conditions:['id = :client_id'],
                params:{
                    client_id:auth.client_id
                }
            },function(_client){
                _$$.render('server',{
                    client: _client
                });
            });
        },
    };
    
    return clientController;
}