module.exports = function(){
    var accountController = {
        index : function (req,res, nxt){
            var model = this.$$.models.account;
            
            this.$$.send(200,{
                appName:this.$$.params.appName
            });
        }
    };
    
    return accountController;
}