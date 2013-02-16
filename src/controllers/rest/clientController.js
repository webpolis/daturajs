module.exports = function(){
    var clientController = {
        /**
         * Updates client server & extra information.
         *
         * @method  updateSettings
         */
        updateSettings : function (req,res, nxt){
            var _this = this;
            
            if(typeof this.data.client ===  'object'){
                var client = this.models.client.getInstance(this.data.client)
                delete this.data.client.id
                
                client.$update(this.data.client, null, function(_client){
                    _this.send(200, {
                        client:_client
                    })
                },function(err){
                    _this.send(400, {
                        success:false,
                        err: err
                    })
                });
            }
        }
    }
    
    return clientController;
}