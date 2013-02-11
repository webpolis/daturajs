module.exports = function(){
    var locationController = {
        getStates : function (req,res, nxt){
            console.log(this)
            res.send(200,1)
        }
    };
    
    return locationController;
}