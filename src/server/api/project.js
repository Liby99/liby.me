var mysql = require("../module/mysql.js");

module.exports = {
    getAdminProjects: function (callback) {
        mysql.query("SELECT * FROM `project` ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getThreeProjects: function (callback) {
        mysql.query("SELECT `name`, `author`, `url` FROM `project` WHERE `status` = 1 ORDER BY `date_time` DESC LIMIT 3", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getProjects: function (callback) {
        mysql.query("SELECT `name`, `author`, `url` FROM `project` WHERE `status` = 1 ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getAdminProjectData: function (project, callback) {
        mysql.query("SELECT * FROM `project` WHERE ?", {
            "PUID": project
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result[0]);
            }
        });
    },
    getProjectData: function (project, callback) {
        this.getAdminProjectData(project, function (data) {
            if (data == undefined) {
                callback(undefined);
            }
            else {
                delete data.status;
                delete data.PUID;
                delete data.id;
                callback(data);
            }
        });
    },
    updateProject: function (project, name, author, url, status, dateTime, cover, callback) {
        mysql.query("UPDATE `project` SET `name` = ?, `author` = ?, `url` = ?, `status` = ?, `date_time` = ? WHERE `PUID` = ?", [
            name,
            author,
            url,
            status,
            dateTime,
            cover,
            project
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        })
    },
    newProject: function (name, author, url, status, dateTime, cover, callback) {
        mysql.query("INSERT INTO `project` SET `PUID` = UUID(), ?", {
            "name": name,
            "author": author,
            "url": url,
            "status": status,
            "date_time": dateTime
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    changeStatus: function (project, status, callback) {
        mysql.query("UPDATE `project` SET `status` = ? WHERE `PUID` = ?", [
            status,
            project
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        })
    }
}
