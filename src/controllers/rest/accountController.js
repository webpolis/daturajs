module.exports = function(_){
    var accountController = {
        index : function (req,res, nxt){
            var model = _.models['account']; // instantiate model
            res.send({});
        }
    };
    
    return accountController;
}