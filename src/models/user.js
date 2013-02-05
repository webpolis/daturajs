module.exports = function (db, cb) {
    db.define('user', {
        username : String,
        password : String
    });

    return cb();
};
