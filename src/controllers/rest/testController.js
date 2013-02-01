module.exports = function(){
    var _ = {
        index : function (req,res, nxt){
            res.send('rest ok');
        }
    };
    
    return _;
}