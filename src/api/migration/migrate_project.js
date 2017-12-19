const ProjectOld = require("../old/project.old");
const Project = require("../project");
const Promise = require("../lib/promise");
const fs = require("fs");
const path = require("path");

module.exports = function (req, res, callback) {
    ProjectOld.getAdminProjects(function (projects) {
        Promise.all(projects, (project, i, c, e) => {
            var cover = getCover(project["PUID"]);
            Project.newProject(project["name"], project["author"], project["url"],
                project["status"], project["date_time"], cover, c, e);
        }, () => {
            res.send("success");
        }, (err) => {
            res.error(500, err);
            throw err;
        });
    });
}

function getCover (auid) {
    var filename = path.join(__dirname, "../../public/img/project/" + auid + ".jpg");
    return getImage(filename);
}

function getImage (filename) {
    return "data:image/jpeg;base64," + fs.readFileSync(filename, "base64");
}
