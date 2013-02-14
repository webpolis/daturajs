module.exports = function(){
    var vendorController = {
        index : function (req,res){
            var auth = req.signedCookies.auth;

            // @todo apply role based permission
            if(typeof auth === 'undefined' || !auth.id){
                res.redirect('/')
                return
            }
            
            var vendor = this.$$.models.vendor.getInstance({
                client_id:auth.client_id
            })
            
            this.$$.app.set('title','Vendors');
            this.$$.app.set('code','vendor.index');
            
            this.$$.render('list',{
                clientId : auth.client_id,
                vendor: vendor,
                vendorColumns : vendor.$getFields(vendor.getListableColumns())
            });
        }
    };
    return vendorController;
}