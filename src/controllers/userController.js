module.exports = function(){
    var userController = {
        login : function (req,res){
            this.$$.render('login');
        },
        register : function (req,res){
            this.$$.render('register');
        },
        logout : function(req,res, nxt){
            this.$$.app.disable('user');
            res.redirect('/');
        }
    };
    
    return userController;
}