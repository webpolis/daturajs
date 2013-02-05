module.exports = function(){
    var staticController = {
        home : function (req,res){
            var model = this.$$.models.account;
            
            this.$$.render('home',{
                appName:this.$$.params.appName
            });
        }
    };
    
    return staticController;
}