module.exports = function(){
    var staticController = {
        home : function (req,res){
            this.$$.app.set('title','Home');
            
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