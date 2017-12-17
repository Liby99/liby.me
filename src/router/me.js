var Project = require("../api/project.js");

module.exports = function (req, res, callback) {
    Project.getThreeProjects(function (projects) {
        callback({
            "projects": projects
        });
    });
}
