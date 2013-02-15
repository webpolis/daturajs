module.exports = function(){
    var clientController = {
        /**
         * Updates client server & extra information.
         *
         * @method  updateSettings
         */
        updateSettings : function (req,res, nxt){
            var _$$ = this.$$;
            var data = req.body;
            
            if(typeof data.client ===  'object'){
                var client = this.$$.models.client.getInstance(data.client)
                delete data.client.id
                
                client.$update(data.client, null, function(_client){
                    _$$.send(200, {
                        client:_client
                    })
                },function(err){
                    _$$.send(400, {
                        success:false,
                        err: err
                    })
                });
            }
        }
    }
    
    return clientController;
}