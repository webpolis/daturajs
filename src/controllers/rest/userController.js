module.exports = function(){
    var userController = {
        register : function (req,res, nxt){
            var user = this.$$.models.user;
            var data = req.body;
            
            this.$$.send(200,data);
        }
    };
    
    return userController;
}