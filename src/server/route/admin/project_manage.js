var Admin = require("../../api/admin.js");
var Project = require("../../api/project.js");

module.exports = function (req, res) {
    Admin.verify(req, res, function () {
        Project.getAdminProjects(function (projects) {
            res.render("admin/project_manage", {
                "projects": projects
            });
        });
    });
}
