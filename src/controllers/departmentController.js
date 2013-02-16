var gridHelper = require('../helpers/grid');

module.exports = function(){
    var departmentController = {
        index : function (req,res){
            // @todo apply role based permission
            if(this.auth===null){
                res.redirect('/')
                return
            }
            
            var department = this.models.department.getInstance({
                client_id:this.auth.client_id
            })
            
            this.app.set('title','Departments');
            this.app.set('code','department.index');
            
            this.render('list',{
                clientId : this.auth.client_id,
                department: department,
                departmentColumns : gridHelper.typeMap(department.$getFields(department.getListableColumns()))
            });
        }
    };
    return departmentController;
}