module.exports = function (db, cb) {
    db.define('account', {
        username : String,
        password : String
    });

    return cb();
};