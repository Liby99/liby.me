var Project = require("../api/project.js");

module.exports = function (req, res, callback) {
    Project.getFourProjects(function (projects) {
        callback({
            "projects": projects
        })
    });
}
