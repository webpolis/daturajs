module.exports = function(_){
    var staticController = {
        home : function (req,res){
            res.render(__dirname+'/../views/static/home');
        }
    };
    
    return staticController;
}