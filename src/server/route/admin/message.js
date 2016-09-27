var admin = require("../../api/admin.js");

module.exports = function (req, res) {
    admin.verify(req, res, function () {
        res.render("admin/message");
    });
}
