var admin = require("../../api/admin.js");

module.exports = function (req, res) {
    console.log("I'm here!")
    admin.loggedIn(req, function (logged) {
        if (logged) {
            res.send("You have already logged in");
        }
        else {
            res.redirect("login.html?login=false");
        }
    });
}
