var Admin = require("../../api/admin.js");
var Project = require("../../api/project.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        Project.getAdminProjects(function (projects) {
            callback({
                "projects": projects
            });
        }, (err) => {
            res.error(err);
        });
    }, (err) => {
        res.error(err);
    });
}
