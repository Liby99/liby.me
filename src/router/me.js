var Project = require("../api/project");

module.exports = function (req, res, callback) {
    Project.getThreeProjects(function (projects) {
        callback({
            "projects": projects
        });
    });
}
