module.exports = function(){
    var departmentController = {
        list : function (req,res){
            var auth = req.signedCookies.auth;

            // @todo apply role based permission
            if(typeof auth === 'undefined' || !auth.id){
                res.redirect('/')
                return
            }
            
            this.$$.app.set('title','Departments');
            this.$$.app.set('code','department.list');
            
            this.$$.render('list',{
                clientId : auth.client_id
            });
        }
    };
    
    return departmentController;
}