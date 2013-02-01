module.exports = function(_){
    var _ = {
        home : function (req,res){
            res.render(__dirname+'/../views/static/home');
        }
    };
    
    return _;
}