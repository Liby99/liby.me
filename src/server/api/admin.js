/**
 *
 */

var crypto = require("../module/crypto.js");
var mysql = require("../module/mysql.js");
var util = require("../module/util.js");
var TimeSpan = require("../module/TimeSpan.js");

module.exports = {
    debug: true,
    passwordRegex: /^[\w\d\-_]{8,20}$/,
    /**
     * General Verification of the req and res. Directly redirect to login page when not logged in
     * @param {Request} req
     * @param {Response} res
     * @param {Function} callback
     */
    verify: function (req, res, callback) {
        var self = this;
        this.loggedIn(req, function (logged) {
            if (logged) {
                callback();
            }
            else {
                console.log("This guy have not logged in. Redirecting to login");
                res.redirect("login.html");
            }
        });
    },
    /**
     * Check if the user has logged in
     * @param {Request} req, the request object
     * @callback boolean. True for logged in, False for not logged in.
     */
    loggedIn: function (req, callback) {
        var self = this;
        
        if (req.cookies.session) {
            
            log("Session Cookie Found");
            
            mysql.query("SELECT * FROM `user` WHERE ?", {
                "session": req.cookies.session
            }, function (err, result) {
                if (!err) {
                    if (result.length > 0) {
                        
                        log("Session inside database");
                        
                        //Calculate the expire time
                        var curr = (new Date()).getTime();
                        var start = Date.parse(result[0]["session_start"]);
                        var ts = new TimeSpan(curr - start);
                        
                        if (ts.getHour() <= 1) {
                            
                            log("Session within one hour");
                            
                            //Update the session start time
                            self.updateSession(result[0]["username"], function (updated) {
                                if (updated) {
                                    
                                    log("Session Updated");
                                    callback(true);
                                }
                                else {
                                    
                                    log("Session Failed to Update");
                                    
                                    callback(false);
                                }
                            });
                        }
                        else {
                            
                            log("Session expired. Greater than 1 hour");
                            
                            //The session has expired
                            callback(false);
                        }
                    }
                    else {
                        
                        log("Session not in database");
                        
                        callback(false);
                    }
                }
                else {
                    
                    log("Database failed to load the session");
                    
                    callback(false);
                }
            });
        }
        else {
            
            log("No Session inside cookie");
            
            callback(false);
        }
    },
    /**
     * Check if the user name matches the password
     * @param {String} username, the login username
     * @param {String} password, the login password
     * @callback 0 for success, 1 for no such user, 2 for password incorrect, 3 for internal error
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
        var self = this;
        var session = util.UUID();
        mysql.query("UPDATE `user` SET `login` = `login` + 1, `session_start` = NOW(), ?", {
            "session": session
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                self.setSession(res, session);
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
    setSession: function (res, session) {
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
    },
    /**
     * Update the session start time in the database
     * @param {String} username
     * @param {Function} callback
     * @callback boolean
     */
    updateSession: function (username, callback) {
        mysql.query("UPDATE `user` SET `session_start` = NOW() WHERE ?", {
            "username": username
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    /**
     * Check if the password correct given the session id
     * @param {String} session
     * @param {String} password not encrypted password
     * @param {Function} callback
     */
    checkPasswordWithSession: function (session, password, callback) {
        mysql.query("SELECT `password` FROM `user` WHERE ?", {
            "session": session
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                if (result.length == 0) {
                    callback(false);
                }
                else {
                    if (crypto.match(password, result[0]["password"])) {
                        callback(true);
                    }
                    else {
                        callback(false);
                    }
                }
            }
        })
    },
    /**
     * Check if the given password maatches the requirement
     * @param {String} password not encrypted password
     * @return {Boolean}
     */
    isPassword: function (password) {
        return password.match(this.passwordRegex);
    },
    /**
     * Change the password of the user given session id
     * @param {String} session
     * @param {String} password not encrypted password
     * @param {Function} callback boolean. True if successfully changed, false if not.
     */
    changePassword: function (session, password, callback) {
        var encrypted = crypto.genEncrypted(password);
        mysql.query("UPDATE `user` SET `password` = ? WHERE `session` = ?", [
            encrypted,
            session
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    }
}

var debug = false;

function log(text) {
    if (debug) {
        console.log(text);
    }
}
