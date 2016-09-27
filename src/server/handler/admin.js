var admin = require("../api/admin.js");

module.exports = {
    login: function (req, res) {
        admin.match(req.body["username"], req.body["password"], function (result) {
            if (result == 0) {
                admin.login(req.body["username"], res, function (logged) {
                    if (logged) {
                        res.success({});
                    }
                    else {
                        res.error(4, "Session Log Error");
                    }
                });
            }
            else if (result == 1) {
                res.error(1, "No Such User");
            }
            else if (result == 2) {
                res.error(2, "Incorrect Password");
            }
            else {
                res.error(3, "System Error");
            }
        });
    },
    logout: function (req, res) {
        admin.logout(res);
        res.success({});
    },
    change_password: function (req, res) {
        if (admin.isPassword(req.body["new"])) {
            admin.loggedIn(req, function (logged) {
                if (logged) {
                    admin.checkPasswordWithSession(req.cookies["session"], req.body["original"], function (correct) {
                        if (correct) {
                            admin.changePassword(req.cookies["session"], req.body["new"], function (result) {
                                if (result) {
                                    res.success({});
                                }
                                else {
                                    res.error(4, "Database Error");
                                }
                            });
                        }
                        else {
                            res.error(3, "Your Password Is Incorrect");
                        }
                    });
                }
                else {
                    res.error(2, "You Have Not Logged In Yet!");
                }
            });
        }
        else {
            res.error(1, "The Password Does Not Satisfy the Requirement");
        }
    }
}
