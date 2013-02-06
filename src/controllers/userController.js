module.exports = function(){
    var userController = {
        login : function (req,res){
            this.$$.render('login');
        },
        register : function (req,res){
            this.$$.render('register');
        }
    };
    
    return userController;
}