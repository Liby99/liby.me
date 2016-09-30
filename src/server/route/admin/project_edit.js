var Admin = require("../../api/admin.js");

module.exports = function (req, res) {
    Admin.verify(req, res, function () {
        res.render("admin/project_edit");
    });
}
