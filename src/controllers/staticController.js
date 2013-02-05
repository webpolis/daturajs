module.exports = function(){
    var staticController = {
        home : function (req,res){
            var model = this.$$.models.account;
            model.find(function(models){
                console.log(models); 
            });
            
            this.$$.render('home',{
                appName:this.$$.params.appName
            });
        }
    };
    
    return staticController;
}