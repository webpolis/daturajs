var passport = require('passport')
,passportLocal = require('passport-local').Strategy;

module.exports = function(){
    return{
        initialize: function(rest,app){
            // initialize passport (auth mechanism)
            rest.use(passport.initialize());

            passport.use(new passportLocal({
                passReqToCallback:true
            },
            function(req, username, password, done) {
                // do any check against db or whatever and return 200 on ok, 400 on fail
                var user = {
                    username:username,
                    password:password
                };
                
                // store user info for later usage and permission checking
                app.set('user',user);
                
                return done(200, user);
            }
            ));
        },
        authenticate: function(req, res, nxt){
            return passport.authenticate('local',{
                session: false
            });
        }
    }
}