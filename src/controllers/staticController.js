module.exports = function(){
    var staticController = {
        home : function (req,res){
            this.app.set('title','Home');
            this.app.set('code','home');
            
            this.render({
                view:'home',
                layout:'main'
            });
        }
    };
    
    return staticController;
}