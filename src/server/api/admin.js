/**
 *
 */

var crypto = require("../module/crypto.js");
var mysql = require("../module/mysql.js");
var util = require("../module/util.js");
var TimeSpan = require("../module/TimeSpan.js");

module.exports = {
    /**
     * Check if the user has logged in
     * @param req, the request object
     * @callback boolean. True for logged in, False for not logged in.
     */
    loggedIn: function (req, callback) {
        if (req.cookies.session) {
            mysql.query("SELECT * FROM `user` WHERE ?", {
                "session": req.cookies.session
            }, function (err, result) {
                if (!err) {
                    if (result.length > 0) {
                        
                        //Calculate the expire time
                        var curr = (new Date()).getTime();
                        var start = Date.parse(result[0]["session_start"]);
                        var ts = new TimeSpan(curr - start);
                        
                        if (ts.getHour() <= 1) {
                            callback(true);
                        }
                        else {
                            
                            //The session has expired
                            callback(false);
                        }
                    }
                    else {
                        callback(false);
                    }
                }
                else {
                    callback(false);
                }
            });
        }
        else {
            callback(false);
        }
    },
    /**
     * Check if the user name matches the password
     * @param username, the login username
     * @param password, the login password
     * @callback an integer. 0 for success, 1 for no such user, 2 for password incorrect, 3 for internal error
     */
    match: function (username, password, callback) {
        mysql.query("SELECT * FROM `user` WHERE ?", {
            "username": username
        }, function (err, result) {
            if (!err) {
                if (result.length > 0) {
                    if (crypto.match(password, result[0]["password"])) {
                        callback(0);
                    }
                    else {
                        callback(2);
                    }
                }
                else {
                    callback(1);
                }
            }
            else {
                console.log(err);
                callback(3);
            }
        }, false);
    },
    /**
     * Login the user. Update the session provider (database), and also set the session in the cookie
     * @param username, the user identifier
     * @param res the response to set
     * @callback boolean. True is successfully logged in, and false is not.
     */
    login: function (username, res, callback) {
        var session = util.UUID();
        mysql.query("UPDATE `user` SET `session_start` = NOW(), ?", {
            "session": session
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                this.setSession(session);
                callback(true);
            }
        });
    },
    /**
     * Clear the session of the response
     * @param res, the response to be set
     */
    logout: function (res) {
        this.clearSession(res);
    },
    /**
     * Set the session in the response
     * @param res, the response to set
     */
    setSession: function (res) {
        res.cookie("session", session, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        });
    },
    /**
     * Clear the session in the response
     * @param res, the response to clear
     */
    clearSession: function (res) {
        res.clearCookie("session");
    }
}
