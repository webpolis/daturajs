var gridHelper = require('../helpers/grid');

module.exports = function(){
    var departmentController = {
        index : function (req,res){
            var auth = req.signedCookies.auth;

            // @todo apply role based permission
            if(typeof auth === 'undefined' || !auth.id){
                res.redirect('/')
                return
            }
            
            var department = this.$$.models.department.getInstance({
                client_id:auth.client_id
            })
            
            this.$$.app.set('title','Departments');
            this.$$.app.set('code','department.index');
            
            this.$$.render('list',{
                clientId : auth.client_id,
                department: department,
                departmentColumns : gridHelper.typeMap(department.$getFields(department.getListableColumns()))
            });
        }
    };
    return departmentController;
}