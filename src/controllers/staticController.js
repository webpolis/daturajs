module.exports = function(){
    var staticController = {
        home : function (req,res){
            var model = this.$$.models.user;
            model.findAll().success(function(models){
                console.log(models); 
            });
            
            this.$$.render({
                view:'home',
                layout:'main'
            },{
                appName:this.$$.params.appName
            });
        }
    };
    
    return staticController;
}