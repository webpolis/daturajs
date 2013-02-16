// @todo REST must have token authorization and some sort of mechanism to authenticate client
module.exports = function(){
    var departmentController = {
        getDepartments : function (req,res, nxt){
            if(this.params.clientId){
                var _this = this;
                var department = this.models.department;
                
                department.$find('all',{
                    conditions:['client_id = :client_id AND is_active = true'],
                    params:{
                        client_id:_this.params.clientId
                    },
                    fields:department.getListableColumns(),
                    order:'department_name ASC'
                },function(departments){
                    res.send(200,{
                        departments:departments
                    })
                })
            }else
                this.send(400,false);
        },
        departmentSave : function(req,res, nxt){
            var department = this.data.department;
            var ret = function(err){
                res.send(err?400:200,{
                    department: department
                })
            }
            
            if(department.id && department.id !== null){
                // update
                var _department = this.models.department.getInstance(department);
                delete department.id
                
                _department.$update(department,null,function(_dept){
                    department = _dept;
                    ret(false)
                })
            }else{
                // create new
                this.models.department.$create(department, function(_department){
                    department = _department;
                    ret(false)
                }, function(){
                    ret(true)
                })
            }
        }
    };
    
    return departmentController;
}