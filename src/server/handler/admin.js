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
    }
}
