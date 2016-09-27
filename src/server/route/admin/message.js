var admin = require("../../api/admin.js");
var database = require("../../api/database.js");

module.exports = function (req, res) {
    admin.verify(req, res, function () {
        database.getMessages(function (messages) {
            res.render("admin/message", {
                "messages": messages
            });
        });
    });
}
