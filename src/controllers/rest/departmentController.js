module.exports = function(){
    var departmentController = {
        getDepartments : function (req,res, nxt){
            // @todo REST must have token authorization and some sort of mechanism to authenticate client
            if(req.params.clientId){
                var department = this.$$.models.department;
                
                department.$find('all',{
                    conditions:['client_id = :client_id'],
                    params:{
                        client_id:req.params.clientId
                    },
                    'with':['client'],
                    order:'department_name ASC'
                },function(departments){
                    res.send(200,{
                        departments:departments
                    })
                })
            }else
                res.send(400,false);
        }
    };
    
    return departmentController;
}