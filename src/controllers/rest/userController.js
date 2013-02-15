module.exports = function(){
    var userController = {
        /**
         * Creates a new client and its associated Administrator account.
         *
         * @method  register
         */
        register : function (req,res, nxt){
            var _this = this;
            var data = req.body;
            var user = this.$$.models.user;
            var client = this.$$.models.client;
            var role = this.$$.models.user_role;
            
            // @todo get country id by find
            data.user.country_id = data.user.country_id?data.user.country_id:1;
            data.client.country_id = data.client.country_id?data.client.country_id:data.user.country_id;
            // @todo get state id by find
            data.user.state_id = data.user.state_id?data.user.state_id:1;
            data.client.state_id = data.client.state_id?data.client.state_id:data.user.state_id;
            
            client.$create(data.client,function(client){
                // set default role 'Administrator'
                role.$find('one',{
                    conditions:["user_role_name LIKE ':roleName'"],
                    params:{
                        roleName:'Administrator'
                    }
                },function(_role){
                    if(_role.id){
                        data.user.user_role_id = _role.id;
                        data.user.client_id = client.id;
                        
                        user.$create(data.user,function(user){
                            delete user.password;
                            _this.$$.send(200,user);
                        });
                    }
                }, function(err){
                    _this.$$.send(400,false)
                });
            });
        },
        /**
         * Updates client & accounting server settings.
         *
         * @method  updateSettings
         */
        updateSettings : function (req,res, nxt){
            var _$$ = this.$$;
            var data = req.body;
            
            if(typeof data.user ===  'object'){
                var user = this.$$.models.user.getInstance(data.user)
                var client = this.$$.models.client.getInstance(data.user.client)
                delete data.user.client.id
                
                client.$update(data.user.client, null, function(client){
                    delete data.user.id
                    
                    user.$update(data.user, null, function(user){
                        _$$.send(200, {
                            success:true
                        })
                    },function(err){
                        _$$.send(400, {
                            success:false,
                            err: err
                        })
                    })
                })
            }
        },
        /**
         * Retrieves one user record belonging the specified client.
         * 
         * @method  getUsers
         */
        getUser : function (req,res, nxt){
            if(req.params.clientId){
                var user = this.$$.models.user;
                
                // add additional columns to be made available, not only those that are shown within the grid
                var ff = user.getListableColumns();
                ff = ff.concat(['state_id','address','address2','zip_code', 'username', 'user_role_id', 'is_deleted'])
                
                user.$find('one',{
                    conditions:['client_id = :client_id'],
                    params:{
                        client_id:req.params.clientId
                    },
                    'with':['client'],
                    fields:ff,
                    order:'first_name ASC, last_name ASC'
                },function(_user){
                    res.send(200,{
                        user:_user
                    })
                })
            }else
                res.send(400,false);
        },
        /**
         * Retrieves a list of active users for the specificied client.
         * 
         * @method  getUsers
         */
        getUsers : function (req,res, nxt){
            if(req.params.clientId){
                var user = this.$$.models.user;
                
                // add additional columns to be made available, not only those that are shown within the grid
                var ff = user.getListableColumns();
                ff = ff.concat(['state_id','address','address2','zip_code', 'username', 'user_role_id'])
                
                user.$find('all',{
                    conditions:['client_id = :client_id AND (is_deleted = false OR is_deleted IS NULL)'],
                    params:{
                        client_id:req.params.clientId
                    },
                    fields:ff,
                    order:'first_name ASC, last_name ASC'
                },function(users){
                    res.send(200,{
                        users:users
                    })
                })
            }else
                res.send(400,false);
        },
        getUserRoles : function (req,res, nxt){
            var userRole = this.$$.models.user_role;
                
            userRole.$find('all',null,function(_roles){
                res.send(200,{
                    userRoles:_roles
                })
            })
        },
        /**
         * Updates or creates a new user. No "client" creation is done here, so 
         * the client_id is expected to be set already.
         * 
         * @method  userSave
         */
        userSave : function(req,res, nxt){
            var user = req.body.user;
            var ret = function(err){
                res.send(err?400:200,{
                    user: user
                })
            }
            
            if(user.id && user.id !== null){
                // update
                var _user = this.$$.models.user.getInstance(user);
                delete user.id
                
                _user.$update(user,null,function(_dept){
                    user = _dept;
                    ret(false)
                })
            }else{
                // create new
                user.country_id = user.country_id?user.country_id:1
                this.$$.models.user.$create(user, function(_user){
                    user = _user;
                    ret(false)
                }, function(){
                    ret(true)
                })
            }
        }
    };
    
    return userController;
}