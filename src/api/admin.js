const Crypto = require("keeling-js/lib/crypto");
const Mongo = require("keeling-js/lib/mongo");
const TimeSpan = require("./lib/timespan");
const ObjectId = require("./lib/object_id");

const Users = Mongo.db.collection("user");

const PASSWORD_REGEX = /^[\w\d\-_]{8,20}$/;

module.exports = {
    verify (req, res, callback, error) {
        this.loggedIn(req, (loggedIn) => {
            if (loggedIn) {
                callback();
            }
            else {
                res.redirect("login.html");
            }
        }, (err) => {
            error(err);
        });
    },
    
    loggedIn (req, callback, error) {
        var self = this;
        if (req.cookies.session) {
            Users.findOne({
                "session": ObjectId(req.cookies.session)
            }, (err, user) => {
                if (err) {
                    error(err);
                }
                else if (!user) {
                    callback(false);
                }
                else {
                    var curr = (new Date()).getTime();
                    var start = Date.parse(user["session_start"]);
                    var ts = new TimeSpan(curr - start);
                    if (ts.getHour() <= 1) {
                        self.updateSession(user["username"], () => {
                            callback(true);
                        }, (err) => {
                            error(err);
                        });
                    }
                    else {
                        callback(false);
                    }
                }
            });
        }
        else {
            callback(false);
        }
    },
    
    match (username, password, callback, error) {
        Users.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                error(err);
            }
            else if (!user) {
                callback(1);
            }
            else {
                if (Crypto.match(password, user["password"])) {
                    callback(0);
                }
                else {
                    callback(2);
                }
            }
        });
    },
    
    login (username, res, callback, error) {
        var self = this;
        var sessionId = ObjectId();
        Users.updateOne({
            username: username
        }, {
            $inc: {
                "login": 1
            },
            $set: {
                "session_start": new Date(),
                "session": sessionId
            }
        }, (err, result) => {
            if (err) {
                error(err);
            }
            else {
                self.setSession(res, sessionId);
                callback();
            }
        });
    },
    
    logout (res) {
        this.clearSession(res);
    },
    
    setSession (res, sessionId) {
        res.cookie("session", sessionId.toString(), {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 12)
        });
    },
    
    clearSession (res) {
        res.clearCookie("session");
    },
    
    updateSession (username, callback, error) {
        Users.updateOne({
            username: username
        }, {
            $set: {
                "session_start": new Date()
            }
        }, (err) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    
    checkPasswordWithSession (session, password, callback, error) {
        Users.findOne({
            "session": ObjectId(session)
        }, (err, user) => {
            if (err) {
                error(err);
            }
            else if (!user) {
                callback(false);
            }
            else {
                callback(Crypto.match(password, user["password"]));
            }
        });
    },
    
    isPassword (password) {
        return password.match(PASSWORD_REGEX);
    },
    
    changePassword (session, password, callback, error) {
        Users.updateOne({
            "session": ObjectId(session)
        }, {
            $set: {
                "password": Crypto.genEncrypted(password)
            }
        }, (err, result) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    
    register (username, password, callback, error) {
        Users.insert({
            "username": username,
            "password": Crypto.genEncrypted(password),
            "date_time": new Date(),
            "login": 0
        }, (err, result) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    }
}
