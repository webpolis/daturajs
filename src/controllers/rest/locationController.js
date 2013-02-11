module.exports = function(){
    var locationController = {
        getStates : function (req,res, nxt){
            var state = this.$$.models.state;
            state.$find('all',{
                order:'state_name ASC'
            },function(states){
                res.send(200,{
                    states:states
                })
            })
        }
    };
    
    return locationController;
}