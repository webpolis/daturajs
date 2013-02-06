module.exports = function(){
    var userController = {
        login : function (req,res, nxt){
            var user = this.$$.models.user;
            var data = req.body;
            
            this.$$.send(200,data);
        },
        register : function (req,res, nxt){
            var user = this.$$.models.user;
            var data = req.body;
            
            this.$$.send(200,data);
        }
    };
    
    return userController;
}