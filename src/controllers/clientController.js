var gridHelper = require('../helpers/grid')
,tds = require('tedious').Connection;

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
                },
                fields:['id','accounting_system_type_id','server_type','server_address',
                'server_port','dbname','dblogin','dbpassword','accounts_payable_code']
            },function(_client){
                _$$.render('server',{
                    client: _client
                });
            });
        },
        testServerConnection : function(req, res){
            var auth = req.signedCookies.auth;

            // @todo apply role based permission
            if(typeof auth === 'undefined' || !auth.id){
                res.redirect('/')
                return
            }
            var client = req && req.body && req.body.client ? req.body.client : null;
            
            if(client!==null){
                var conn = new tds({
                    userName:client.dblogin,
                    password:client.dbpassword,
                    server:client.server_address,
                    options:{
                        connectTimeout:5000,
                        port:client.server_port
                    }
                });
                conn.on('connect', function(err) {
                    res.send(200,{
                        err:err!== undefined ?err :false
                    })
                });
                conn.on('end', function(err) {
                    if(err!==undefined){
                        res.send(400,{
                            err:true
                        })
                    }
                })
            }else{
                res.send(400,false)
            }
        }
    };
    
    return clientController;
}