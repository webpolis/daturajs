// @todo REST must have token authorization and some sort of mechanism to authenticate client
module.exports = function(){
    var vendorController = {
        getVendors : function (req,res, nxt){
            if(req.params.clientId){
                var vendor = this.models.vendor;
                var _this = this;
                
                vendor.$find('all',{
                    conditions:['client_id = :client_id'],
                    params:{
                        client_id:_this.params.clientId
                    },
                    fields:vendor.getListableColumns(),
                    order:'vendor_name ASC'
                },function(vendors){
                    res.send(200,{
                        vendors:vendors
                    })
                })
            }else
                res.send(400,false);
        },
        vendorSave : function(req,res, nxt){
            var vendor = this.data.vendor;
            var ret = function(err){
                res.send(err?400:200,{
                    vendor: vendor
                })
            }
            
            if(vendor.id && vendor.id !== null){
                // update
                var _vendor = this.models.vendor.getInstance(vendor);
                delete vendor.id
                
                _vendor.$update(vendor,null,function(_dept){
                    vendor = _dept;
                    ret(false)
                })
            }else{
                // create new
                this.models.vendor.$create(vendor, function(_vendor){
                    vendor = _vendor;
                    ret(false)
                }, function(){
                    ret(true)
                })
            }
        }
    };
    
    return vendorController;
}