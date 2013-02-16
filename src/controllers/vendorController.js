var gridHelper = require('../helpers/grid');

module.exports = function(){
    var vendorController = {
        index : function (req,res){
            // @todo apply role based permission
            if(this.auth===null){
                res.redirect('/')
                return
            }
            
            var vendor = this.models.vendor.getInstance({
                client_id:this.auth.client_id
            })
            
            this.app.set('title','Vendors');
            this.app.set('code','vendor.index');
            
            this.render('list',{
                clientId : this.auth.client_id,
                vendor: vendor,
                vendorColumns : gridHelper.typeMap(vendor.$getFields(vendor.getListableColumns()))
            });
        }
    };
    return vendorController;
}