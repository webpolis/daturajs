var gridHelper = require('../helpers/grid')
,tds = require('tedious').Connection;

module.exports = function(){
    var clientController = {
        settings : function (req,res){
            // @todo apply role based permission
            if(this.auth===null){
                res.redirect('/')
                return
            }
                
            this.app.set('title','Settings');
            this.app.set('code','client.settings');
            
            var client = this.models.client;
            var _this = this;

            client.$find('one',{
                conditions:['id = :client_id'],
                params:{
                    client_id:this.auth.client_id
                },
                fields:['id','accounting_system_type_id','server_type','server_address',
                'server_port','dbname','dblogin','dbpassword','accounts_payable_code']
            },function(_client){
                _this.render('server',{
                    client: _client
                });
            });
        },
        testServerConnection : function(req, res){
            // @todo apply role based permission
            if(this.auth===null){
                res.redirect('/')
                return
            }
            
            var client = this.data.client ? this.data.client : null;
            
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