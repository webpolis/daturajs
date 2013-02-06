module.exports = function(){
    var staticController = {
        home : function (req,res){
            var model = this.$$.models.user;
            model.findAll().success(function(models){
                console.log(models); 
            });
            
            this.$$.render('home',{
                appName:this.$$.params.appName
            });
        }
    };
    
    return staticController;
}