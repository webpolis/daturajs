module.exports = function(){
    var accountingSystemTypeController = {
        getAccountingSystemTypes : function (req,res, nxt){
            var accountingSystemType = this.models.accounting_system_type;
            accountingSystemType.$find('all',{
                order:'display_order ASC',
                fields:['id','accounting_system_type_name']
            },function(accountingSystemTypes){
                res.send(200,{
                    accountingSystemTypes:accountingSystemTypes
                })
            })
        }
    };
    
    return accountingSystemTypeController;
}