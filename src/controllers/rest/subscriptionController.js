module.exports = function(){
    var subscriptionController = {
        getSubscriptions : function (req,res, nxt){
            var subscription = this.$$.models.subscription;
            subscription.$find('all',{
                order:'subscription_code ASC, subscription_label ASC'
            },function(subscriptions){
                res.send(200,{
                    subscriptions:subscriptions
                })
            })
        }
    };
    
    return subscriptionController;
}